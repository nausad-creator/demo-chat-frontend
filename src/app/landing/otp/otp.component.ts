import { ChangeDetectionStrategy, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Store } from '@ngrx/store';
import { State, user } from 'src/app';
import { Observable } from 'rxjs';
import { SubSink } from 'subsink';
import { Otp } from 'src/app/interface';
import { Verify } from 'src/app/state/actions/login-register.actions';
import { map } from 'rxjs/operators';
import { ResetPasswordComponent } from '../reset-password/reset-password.component';

@Component({
	selector: 'app-otp',
	template: `
<div class="modal-contents" [loader]="(auth$ | async)?.isSearch">
			<div class="modal-header border-0 pb-0">
				<h4 class="modal-title ml-auto text-dark">Forgot your password?</h4>
				<button type="button" (click)="onClose()" class="close" data-dismiss="modal">&times;</button>
			</div>
			<div class="modal-body">
				 <!-- error handler -->
				 <div class="alert alert-danger" role="alert" *ngIf="(auth$ | async)?.errorMessage === 'Invalid OTP.'">
				 	<h5 class="alert-heading text-center">{{'Error'}}!</h5>
					<p class="mb-0 text-center">{{(auth$ | async)?.errorMessage}}</p>
				</div>
      				<!-- handler end -->
				<p class="text-center">{{message}}</p>
				<form [formGroup]="verificationForm" (ngSubmit)="onSubmitOTP(verificationForm.value)" id="otpForm" name="otpForm"
					class="digit-group otp-group needs-validation otpForm" data-group-name="digits"
					data-autosubmit="false" autocomplete="off" novalidate>
					<div class="form-group">
						<label class="w-100 text-center" for="code">Verification Code<span class="required-field"></span></label>
						<div class="d-flex input_otp justify-content-center">
							<input type="text"
								#userOTP1 formControlName="userOTP1"
								id="digit-1" name="digit-1" data-next="digit-2"
								class="form-control col-2"
								oninput="this.value = this.value.replace(/[^0-9.]/g, '');"
								>
							<input type="text"
								#userOTP2 formControlName="userOTP2"
								id="digit-2" name="digit-2" data-next="digit-3"
								data-previous="digit-1" class="form-control col-2"
								oninput="this.value = this.value.replace(/[^0-9.]/g, '');"
								>
							<input type="text"
								#userOTP3 formControlName="userOTP3"
								id="digit-3" name="digit-3" data-next="digit-4"
								data-previous="digit-2" class="form-control col-2"
								oninput="this.value = this.value.replace(/[^0-9.]/g, '');"
								>

							<input type="text"
								#userOTP4 formControlName="userOTP4"
								id="digit-4" name="digit-4" data-next="digit-5"
								data-previous="digit-3" class="form-control col-2"
								oninput="this.value = this.value.replace(/[^0-9.]/g, '');"
								>
						</div>
						<div class="invalid-feedback">Please enter pin</div>
					</div>
					<br>
					<button class="btn btn-lg btn-primary btn-block" type="submit"
						data-toggle="modal" data-backdrop="static"
						data-keyboard="false">Continue</button>
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
	], changeDetection: ChangeDetectionStrategy.OnPush
})
export class OtpComponent implements OnInit, OnDestroy {
	message: string;
	auth$: Observable<{
		userMobile?: string;
		userID?: string;
		query: string,
		isSearch: boolean,
		errorMessage: string
	}> = this.store.select(user);
	subs = new SubSink();
	verificationForm: FormGroup;
	list: { res: { userMobile: string, userID: string }, msg: string }[] = [];
	@ViewChild('userOTP1', { static: false }) userOTP1: ElementRef;
	@ViewChild('userOTP2', { static: false }) userOTP2: ElementRef;
	@ViewChild('userOTP3', { static: false }) userOTP3: ElementRef;
	@ViewChild('userOTP4', { static: false }) userOTP4: ElementRef;
	constructor(
		private modal: BsModalService,
		private bsModal: BsModalRef,
		private fb: FormBuilder,
		private store: Store<State>
	) { }
	ngOnDestroy(): void {
		this.subs.unsubscribe();
	}

	ngOnInit(): void {
		this.verificationForm = this.fb.group({
			userOTP1: [null, Validators.compose([Validators.pattern('^[0-9]*$')])],
			userOTP2: [null, Validators.compose([Validators.pattern('^[0-9]*$')])],
			userOTP3: [null, Validators.compose([Validators.pattern('^[0-9]*$')])],
			userOTP4: [null, Validators.compose([Validators.pattern('^[0-9]*$')])],
			languageID: ['1'],
			userOTP: [''],
			loginuserID: [this.list[0].res.userID],
			userMobile: [this.list[0].res.userMobile],
		});
		this.focus();
		this.message = `Please enter verification code which we have sent to your registered ${this.list[0].msg}`;
	}
	onSubmitOTP = (post: Otp) => {
		this.checkInputFocus(post);
		if (!post.userOTP1) {
			this.verificationForm.get('userOTP1').setValidators([Validators.pattern('^[0-9]*$'), Validators.required]);
			this.verificationForm.get('userOTP1').updateValueAndValidity({ onlySelf: true });
		}
		if (!post.userOTP2) {
			this.verificationForm.get('userOTP2').setValidators([Validators.pattern('^[0-9]*$'), Validators.required]);
			this.verificationForm.get('userOTP2').updateValueAndValidity({ onlySelf: true });
		}
		if (!post.userOTP3) {
			this.verificationForm.get('userOTP3').setValidators([Validators.pattern('^[0-9]*$'), Validators.required]);
			this.verificationForm.get('userOTP3').updateValueAndValidity({ onlySelf: true });
		}
		if (!post.userOTP4) {
			this.verificationForm.get('userOTP4').setValidators([Validators.pattern('^[0-9]*$'), Validators.required]);
			this.verificationForm.get('userOTP4').updateValueAndValidity({ onlySelf: true });
		}
		this.markFormTouched(this.verificationForm);
		if (this.verificationForm.valid && this.findInvalidControls().length === 0) {
			this.verificationForm.get('userOTP').patchValue(`${post.userOTP1}${post.userOTP2}${post.userOTP3}${post.userOTP4}`);
			this.store.dispatch(new Verify(JSON.stringify(this.verificationForm.value)));
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
						if (s?.userMobile && this.bsModal?.id === 3 && !s?.isSearch) {
							this.openReset({
								userMobile: s.userMobile ? s.userMobile : '',
								userID: s.userID ? s.userID : '1',
							});
						}
					})
				));
			}, 100);
		}
	}
	onClose = () => {
		this.bsModal.hide();
	}
	openReset = (res: { userMobile: string, userID: string }) => {
		this.onClose();
		const initialState = {
			list: [{ res }]
		};
		this.bsModal = this.modal.show(ResetPasswordComponent, {
			id: 4, initialState, backdrop: 'static',
			keyboard: false,
			animated: true,
			ignoreBackdropClick: true,
		});
	}
	checkInputFocus = (post: Otp) => {
		let temp = false;
		Object.keys(post).forEach((key) => {
			if (key === 'userOTP1' && !post[key] && !temp) {
				this.userOTP1.nativeElement.focus();
				temp = true;
			}
			if (key === 'userOTP2' && !post[key] && !temp) {
				this.userOTP2.nativeElement.focus();
				temp = true;
			}
			if (key === 'userOTP3' && !post[key] && !temp) {
				this.userOTP3.nativeElement.focus();
				temp = true;
			}
			if (key === 'userOTP4' && !post[key] && !temp) {
				this.userOTP4.nativeElement.focus();
				temp = true;
			}
		});
	}
	findInvalidControls = () => {
		const invalid = [];
		const controls = this.verificationForm.controls;
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
	focus = () => {
		$('.digit-group').find('input').each(function () {
			$(this).attr('maxlength', 1);
			$(this).on('keyup', function (e) {
				const parent = $($(this).parent());

				if (e.keyCode === 8 || e.keyCode === 37) {
					const prev = parent.find('input#' + $(this).data('previous'));

					if (prev.length) {
						$(prev).select();
					}
				} else if ((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 65 && e.keyCode <= 90) || (e.keyCode >= 96 && e.keyCode <= 105) || e.keyCode === 39) {
					const next = parent.find('input#' + $(this).data('next'));

					if (next.length) {
						$(next).select();
					} else {
						if (parent.data('autosubmit')) {
							parent.submit();
						}
					}
				}
			});
		});
	}
}
