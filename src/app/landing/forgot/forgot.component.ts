import { ChangeDetectionStrategy, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { State, user } from 'src/app';
import { OtpComponent } from '../otp/otp.component';
import { Forgot } from 'src/app/state/actions/login-register.actions';
import { SubSink } from 'subsink';

@Component({
	selector: 'app-forgot',
	template: `
<div class="modal-contents" [loader]="(auth$ | async)?.isSearch">
	<div class="modal-header pt-2 pb-0" style="border-bottom:none;">
		<button type="button" class="close" (click)="onClose()" data-dismiss="modal">&times;</button>
	</div>
	<div class="modal-body pt-0">
		<!-- error handler -->
		<div class="alert alert-danger" role="alert" *ngIf="(auth$ | async)?.errorMessage === 'Incorrect email and/or phone.'">
			<h5 class="alert-heading text-center">Error!</h5>
			<p class="mb-0 text-center">{{(auth$ | async)?.errorMessage}}</p>
		</div>
		<!-- handler end -->
		<form [formGroup]="forgetForm" (ngSubmit)="onSubmitEmailOrMobile(forgetForm.value)" method="post"
			class="bootstrap-form needs-validation login-form" novalidate="novalidate" id="login-form" name="login-form">
			<h4 class="modal-title">Forgot your Password</h4>
			<p class="text-secondary">Enter your registered email/ or phone number to reset your password. </p>
			<div class="form-row pb-2">
				<div class="form-group col-md-12">
					<input type="email" #forgotEmail (keydown.space)="$event.preventDefault()" formControlName="userEmail" class="form-control email" placeholder="Enter Email/ or Phone" id="email" name="email" autocomplete="off" />
					<small class="text-danger" *ngIf="forgetForm.controls['userEmail'].hasError('required')">This field is required.</small>
              				<small class="text-danger" *ngIf="forgetForm.controls['userEmail'].hasError('pattern') && (forgetForm.controls['userEmail'].dirty || forgetForm.controls['userEmail'].touched)">Please enter valid email or phone.</small>
				</div>
				<div class="col-md-12 col-sm-12 pt-3 pb-3 text-center">
					<button type="submit" class="get-started-btn btnlogin">Continue</button>
				</div>
			</div>
		</form>
	</div>
</div>`,
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
	}`,
		`.required-field::before {
		content: "*";
		color: red;
  	}`
	],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ForgotComponent implements OnInit, OnDestroy {
	forgetForm: FormGroup;
	auth$: Observable<{
		userMobile?: string;
		userID?: string;
		query: string,
		isSearch: boolean,
		errorMessage: string
	}> = this.store.select(user);
	subs = new SubSink();
	@ViewChild('forgotEmail', { static: false }) forgotEmail: ElementRef;
	constructor(
		private modal: BsModalService,
		private bsModal: BsModalRef,
		private fb: FormBuilder,
		private store: Store<State>
	) {
		this.forgetForm = this.fb.group({
			userEmail: ['', Validators.compose([Validators.pattern(/^(\d{10}|\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3}))$/)])],
			userMobile: [''],
			languageID: ['1'],
			userCountryCode: ['+91']
		});
	}
	ngOnDestroy(): void {
		this.subs.unsubscribe();
	}
	onSubmitEmailOrMobile = (post: { userEmail: string; userMobile: string; languageID: string }) => {
		if (!this.checkControlPost(post)) {
			this.markFormTouched(this.forgetForm);
			if (this.forgetForm.valid) {
				if (!isNaN(+post.userEmail)) {
					this.forgetForm.get('userMobile').patchValue(post.userEmail);
					this.forgetForm.get('userEmail').patchValue('');
					this.store.dispatch(new Forgot(JSON.stringify(this.forgetForm.value)));
					setTimeout(() => {
						this.subs.add(this.auth$.pipe(map(r => {
							return {
								userMobile: r?.userMobile,
								userID: r.userID,
								isSearch: r?.isSearch,
								errorMessage: r?.errorMessage
							};
						})).subscribe(
							(s => {
								if (s?.userMobile && this.bsModal?.id === 2) {
									this.openOTP({
										userMobile: s.userMobile ? s.userMobile : post.userEmail,
										userID: s.userID ? s.userID : '1',
									}, 'mobile number');
								}
							})
						));
					}, 100);
				} else {
					this.forgetForm.get('userEmail').patchValue(post.userEmail);
					this.forgetForm.get('userMobile').patchValue('');
					this.store.dispatch(new Forgot(JSON.stringify(this.forgetForm.value)));
					setTimeout(() => {
						this.subs.add(this.auth$.pipe(map(r => {
							return {
								userMobile: r?.userMobile,
								userID: r.userID,
								isSearch: r?.isSearch,
								errorMessage: r?.errorMessage
							};
						})).subscribe(
							(s => {
								if (s?.userMobile && this.bsModal?.id === 2) {
									this.openOTP({
										userMobile: s.userMobile ? s.userMobile : post.userEmail,
										userID: s.userID ? s.userID : '1',
									}, 'email');
								}
							})
						));
					}, 100);
				}
			}
		}
	}
	checkControlPost = (post: {
		userEmail: string;
	}) => {
		let invalid = false;
		Object.keys(post).forEach((key: string) => {
			if (key === 'userEmail' && !this.forgetForm.get(`${key}`).value) {
				this.forgotEmail.nativeElement.focus();
				this.forgetForm.get(`${key}`).setValidators([Validators.required, Validators.pattern(/^(\d{10}|\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3}))$/)]);
				this.forgetForm.get(`${key}`).updateValueAndValidity({ onlySelf: true });
				return invalid = true;
			}
		});
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
	openOTP = (res: { userMobile: string, userID: string }, msg: string) => {
		this.onClose();
		const initialState = {
			list: [{
				res,
				msg
			}]
		};
		this.bsModal = this.modal.show(OtpComponent, {
			id: 3, initialState, backdrop: 'static',
			keyboard: false,
			animated: true,
			ignoreBackdropClick: true,
		});
	}
	ngOnInit(): void {
	}
}
