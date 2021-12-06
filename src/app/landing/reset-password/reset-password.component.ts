import { ChangeDetectionStrategy, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Store } from '@ngrx/store';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { user, State } from 'src/app';
import { User, ResetInterface } from 'src/app/interface';
import { Reset } from 'src/app/state/actions/login-register.actions';
import { SubSink } from 'subsink';

@Component({
	selector: 'app-reset-password',
	template: `
  <!-- The Modal ResetPassword -->
<div class="modal-content" [loader]="(auth$ | async)?.isSearch">
	<!-- Modal Header -->
	<div class="modal-header pt-2 " style="border-bottom:none;">
		<h4 class="modal-title">Reset Password</h4>
		<button type="button" class="close" (click)="onClose()" data-dismiss="modal">&times;</button>
	</div>
	<!-- Modal body -->
	<div class="modal-body ">
		<!-- error handler -->
		<div class="alert alert-danger" role="alert"
			*ngIf="(auth$ | async)?.errorMessage === 'Opps! Something went wrong.'">
			<h5 class="alert-heading text-center">{{'Error'}}!</h5>
			<p class="mb-0 text-center">{{(auth$ | async)?.errorMessage}}</p>
		</div>
		<!-- handler end -->
		<form [formGroup]="resetForm" (ngSubmit)="onReset(resetForm.value)" method="post"
			class="bootstrap-form needs-validation login-form" novalidate="novalidate" id="login-form"
			name="login-form">
			<div class="form-row pb-2">
				<div class="form-group col-md-12">
					<a class="eyeIconReset cursr" (click)="new=!new"><i class="fa "
							[ngClass]="{'fa-eye': !new, 'fa-eye-slash': new}"></i></a>
					<input #userNewPassword type="password" [type]=" new ? 'password' : 'text' "
						formControlName="userNewPassword"
						(keydown.space)="$event.preventDefault()" type="password"
						name="userNewPassword" class="form-control" id="userNewPassword"
						placeholder="Enter New Password" />
					<small class="text-danger"
						*ngIf="resetForm.controls['userNewPassword'].hasError('required')">Please
						enter password.</small>
					<small class="text-danger"
						*ngIf="resetForm.controls['userNewPassword'].hasError('pattern') && (resetForm.controls['userNewPassword'].dirty || resetForm.controls['userNewPassword'].touched)">Password
						needs to be at least eight characters, one uppercase letter and one
						number.</small>
				</div>
				<div class="form-group col-md-12">
					<a class="eyeIconReset cursr" (click)="confirm=!confirm"><i class="fa "
							[ngClass]="{'fa-eye': !confirm, 'fa-eye-slash': confirm}"></i></a>
					<input #userReNewPassword type="password"
						[type]=" confirm ? 'password' : 'text' "
						formControlName="userReNewPassword"
						(keydown.space)="$event.preventDefault()" name="userReNewPassword"
						class="form-control" id="userReNewPassword"
						placeholder="Confirm Password" />
					<small class="text-danger"
						*ngIf="resetForm.controls['userReNewPassword'].hasError('required')">Please
						re-enter password.</small>
					<small class="text-danger "
						*ngIf="resetForm.hasError('confirmedValidator')">Re-enter Password is
						not matched.</small>
				</div>
				<div class="col-md-12 col-sm-12 pt-3 pb-3 text-center">
					<button type="submit" class="get-started-btn btnlogin">Save</button>
				</div>
			</div>
		</form>
	</div>
</div>
  `,
	styles: [
		`.modal-contents {
		position: relative;
		display: flex;
		flex-direction: column;
		width: 100%;
		pointer-events: auto;
		background-color: #fff;
		background-clip: padding-box;
		border-radius: .3rem;
		outline: 0;
	  }
	  .required-field::before {
			content: "*";
			color: red;
  	}`
	],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResetPasswordComponent implements OnInit, OnDestroy {
	list: { res: { userMobile: string, userID: string } }[] = [];
	new = true;
	confirm = true;
	resetForm: FormGroup;
	subs = new SubSink();
	@ViewChild('userNewPassword', { static: false }) userNewPassword: ElementRef;
	@ViewChild('userReNewPassword', { static: false }) userReNewPassword: ElementRef;
	auth$: Observable<{ user: User, isSearch: boolean, errorMessage: string }> = this.store.select(user);
	constructor(
		private bsModal: BsModalRef,
		private fb: FormBuilder,
		private store: Store<State>
	) {
	}
	ngOnDestroy(): void {
		this.subs.unsubscribe();
	}
	checkPasswords = (group: FormGroup) => {
		const password = group.get('userNewPassword').value;
		const confirmPassword = group.get('userReNewPassword').value;
		if (password && confirmPassword) {
			return password === confirmPassword ? null : { confirmedValidator: true };
		}
	}
	onReset = (post: ResetInterface) => {
		if (!post.userNewPassword && !post.userNewPassword) {
			this.userNewPassword.nativeElement.focus();
			this.resetForm.get('userNewPassword').setValidators([Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/)]);
			this.resetForm.get('userNewPassword').updateValueAndValidity({ onlySelf: true });
			this.resetForm.get('userReNewPassword').setValidators([Validators.required]);
			this.resetForm.get('userReNewPassword').updateValueAndValidity({ onlySelf: true });
		}
		if (post.userNewPassword && !post.userReNewPassword) {
			this.userReNewPassword.nativeElement.focus();
			this.resetForm.get('userReNewPassword').setValidators([Validators.required]);
			this.resetForm.get('userReNewPassword').updateValueAndValidity({ onlySelf: true });
		}
		this.markFormTouched(this.resetForm);
		if (this.resetForm.valid && this.findInvalidControlsReset().length === 0) {
			this.store.dispatch(new Reset(JSON.stringify(this.resetForm.value)));
			setTimeout(() => {
				this.subs.add(this.auth$.pipe(map(r => {
					return {
						isUser: r?.user,
						isSearch: r?.isSearch,
						errorMessage: r?.errorMessage
					};
				})).subscribe(
					(s => {
						if (this.bsModal?.id === 4 && !s?.isSearch && s?.isUser) {
							this.onClose();
						}
					})
				));
			}, 100);
		}
	}
	findInvalidControlsReset = () => {
		const invalid = [];
		const controls = this.resetForm.controls;
		for (const name in controls) {
			if (controls[name].invalid) {
				invalid.push(name);
			}
		}
		return invalid;
	}
	markFormTouched = (group: FormGroup | FormArray) => {
		Object.keys(group.controls).forEach((key: string) => {
			const control = group.controls[key];
			if (control instanceof FormGroup || control instanceof FormArray) {
				control.markAsTouched();
				this.markFormTouched(control);
			} else {
				control.markAsTouched();
			}
		});
	}
	onClose = () => {
		this.bsModal.hide();
	}
	ngOnInit(): void {
		this.resetForm = this.fb.group({
			userNewPassword: ['', Validators.compose([Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/)])],
			userReNewPassword: [''],
			languageID: ['1'],
			userID: [this.list[0].res.userID]
		}, { validators: this.checkPasswords });
	}
}
