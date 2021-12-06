import { ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { State, user } from 'src/app';
import { User } from 'src/app/interface';
import { Register } from 'src/app/state/actions/login-register.actions';

@Component({
	selector: 'app-signup',
	template: `
	<div class="modal-contents" [loader]="(auth$ | async)?.isSearch">
	<div class="modal-header border-0">
		<h4 class="modal-title ml-auto text-dark">Welcome to First Stab!</h4>
		<button type="button" class="close" (click)="onClose()" data-dismiss="modal">&times;</button>
	</div>
	<div class="modal-body">
		<div class="alert alert-danger" role="alert" *ngIf="(auth$ | async)?.errorMessage === 'Incorrect email and/or password.'">
			<h5 class="alert-heading text-center">{{'Error'}}!</h5>
			<p class="mb-0 text-center">{{(auth$ | async)?.errorMessage}}</p>
			</div>
				<form [formGroup]="registerForm" (ngSubmit)="onClickregister(registerForm.value);"
					class="form-signin RigisterForm bootstrap-form needs-validation" novalidate>
					<div class="form-row">
						<div class="form-group col-md">
							<input #userFirstNameRegister formControlName="userFirstName" type="text" class="form-control" id="Fname" name="Fname"
								placeholder="First Name" autocomplete="off">
							<small class="text-danger small"
							*ngIf="registerForm.controls['userFirstName'].hasError('required')">Please enter first name.</small>
						</div>
						<div class="form-group col-md">
							<input #userLastNameRegister formControlName="userLastName" type="text" class="form-control" id="Lname" name="Lname"
								placeholder="Last Name" autocomplete="off">
							<small class="text-danger small"
							*ngIf="registerForm.controls['userLastName'].hasError('required')">Please enter last name.</small>
						</div>
					</div>
					<div class="form-row">
					<div class="form-group col-md-12">
						<input #userEmailRegister formControlName="userEmail" type="email" id="Email2" name="Email2" class="form-control"
							placeholder="Email address">
						<small class="text-danger small"
							*ngIf="registerForm.controls['userEmail'].hasError('required')">Please enter email.</small>
						<small class="text-danger"
							*ngIf="registerForm.controls['userEmail'].hasError('emailAlreadyExist') || (auth$ | async)?.errorMessage === 'Email already exist.'">Email already exist.</small>
						<small class="text-danger small"
							*ngIf="registerForm.controls['userEmail'].hasError('pattern')">Please enter valid email.</small>
					</div>
					<div class="form-group col-md-12">
						<input #userMobileRegister formControlName="userMobile" type="text" class="form-control example" id="phone"
							placeholder="Mobile Number" name="phone" maxlength="10" autocomplete="off"
							oninput="this.value = this.value.replace(/[^0-9.]/g, '');">
						<small class="text-danger small"
						*ngIf="registerForm.controls['userMobile'].hasError('required')">Please enter mobile.</small>
						<small class="text-danger"
						*ngIf="registerForm.controls['userMobile'].hasError('mobileExist') || (auth$ | async)?.errorMessage === 'Mobile already exist.'">Mobile already exist.</small>
						<small class="text-danger"
						*ngIf="registerForm.controls['userMobile'].hasError('pattern')">Please enter valid mobile.</small>
					</div>
					<div class="form-group col-md-12">
						<input #userPasswordRegister formControlName="userPassword" [type]=" hide_1 ? 'password' : 'text' "
							(keydown.space)="$event.preventDefault()" type="password" id="inputPasswordRegister" name="Password"
							class="form-control" placeholder="Password">
						<a class="eyeIconReset cursr" (click)="hide_1=!hide_1"><i class="fa "
							[ngClass]="{'fa-eye': !hide_1, 'fa-eye-slash': hide_1}"></i></a>
						<small class="text-danger small"
							*ngIf="registerForm.controls['userPassword'].hasError('required')">Please re-enter password.</small>
						<small class="text-danger"
							*ngIf="registerForm.controls['userPassword'].hasError('pattern')">Password needs to be at least eight characters, one uppercase letter and one number.</small>
					</div>
					<div class="form-group col-md-12">
						<input #userRePasswordRegister formControlName="userRePassword" [type]=" hide_2 ? 'password' : 'text' "
							(keydown.space)="$event.preventDefault()" type="password" id="CPassword" name="CPassword"
							class="form-control" placeholder="Confirm Password">
						<a class="forgotpin">
						<i class="fa " [ngClass]="{'fa-eye': !hide_2, 'fa-eye-slash': hide_2}" (click)="hide_2 = !hide_2"></i>
						</a>
						<small class="text-danger small"
							*ngIf="registerForm.controls['userRePassword'].hasError('required')">Please re-enter password.</small>
						<small class="text-danger "
							*ngIf="registerForm.hasError('confirmedValidator')">Re-enter Password is not matched.</small>
					</div>
					<div class="form-group col-md-12 mb-1">
						<p>By clicking on Registration button, you accept <br>
							<a href="#" class="text-underline">Terms &
								Conditions</a> and <a class="text-underline"
								href="#">Privacy
								Policy</a>
						</p>
					</div>
					<div class="col-md-12 col-sm-12 pt-3 pb-3 text-center">
						<button type="submit" class="get-started-btn btnlogin">Register</button>
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
	], changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignupComponent implements OnInit {
	hide_1 = true;
	hide_2 = true;
	registerForm: FormGroup;
	auth$: Observable<{
		user: User,
		query: string,
		isSearch: boolean,
		errorMessage: string
	}> = this.store.select(user);
	@ViewChild('userFirstNameRegister', { static: false }) userFirstNameRegister: ElementRef;
	@ViewChild('userLastNameRegister', { static: false }) userLastNameRegister: ElementRef;
	@ViewChild('userEmailRegister', { static: false }) userEmailRegister: ElementRef;
	@ViewChild('userMobileRegister', { static: false }) userMobileRegister: ElementRef;
	@ViewChild('userPasswordRegister', { static: false }) userPasswordRegister: ElementRef;
	@ViewChild('userRePasswordRegister', { static: false }) userRePasswordRegister: ElementRef;
	constructor(
		private bsModal: BsModalRef,
		private fb: FormBuilder,
		private store: Store<State>
	) {
		// for register
		this.registerForm = this.fb.group({
			userFirstName: [''],
			userLastName: [''],
			userEmail: ['', Validators.compose([Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)])],
			userMobile: ['', Validators.compose([Validators.pattern('^((\\+971-?)|0)?[0-9]{10}$')])],
			userPassword: ['', Validators.compose([Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/)])],
			userRePassword: [''],
			userCountryCode: ['+91'],
			userProfilePicture: ['a.png'],
			languageID: ['1']
		}, { validators: this.checkPasswords });
	}
	checkPasswords = (group: FormGroup) => {
		const password = group.get('userPassword').value;
		const confirmPassword = group.get('userRePassword').value;
		if (password && confirmPassword) {
			return password === confirmPassword ? null : { confirmedValidator: true };
		}
	}
	check_email = async () => {
		// checking for duplicate user!!!!
		if (this.registerForm.get('userEmail').value && this.registerForm.get('userEmail').valid) { }
	}
	check_phone = async () => {
		// checking for duplicate user!!!!
		if (this.registerForm.get('userMobile').value && this.registerForm.get('userMobile').valid) { }
	}
	onClickregister = async (post: {
		userFirstName: string;
		userLastName: string;
		userEmail: string;
		userMobile: string;
		userPassword: string;
		userRePassword: string;
	}) => {
		this.checkInputFocusRegister(post);
		if (!this.checkControlPostRegister(post)) {
			this.markFormTouched(this.registerForm);
			if (this.registerForm.valid && this.findInvalidControlsRegister().length === 0) {
				this.store.dispatch(new Register(JSON.stringify(post)));
			}
		}
		if (this.checkControlPostRegister(post)) {
			this.markFormTouched(this.registerForm);
		}
	}
	checkInputFocusRegister = (post: {
		userFirstName: string;
		userLastName: string;
		userEmail: string;
		userMobile: string;
		userPassword: string;
		userRePassword: string;
	}) => {
		let temp = false;
		Object.keys(post).forEach((key) => {
			if (key === 'userFirstName' && !post[key] && !temp) {
				this.userFirstNameRegister.nativeElement.focus();
				temp = true;
			}
			if (key === 'userLastName' && !post[key] && !temp) {
				this.userLastNameRegister.nativeElement.focus();
				temp = true;
			}
			if (key === 'userEmail' && !post[key] && !temp) {
				this.userEmailRegister.nativeElement.focus();
				temp = true;
			}
			if (key === 'userMobile' && !post[key] && !temp) {
				this.userMobileRegister.nativeElement.focus();
				temp = true;
			}
			if (key === 'userPassword' && !post[key] && !temp) {
				this.userPasswordRegister.nativeElement.focus();
				temp = true;
			}
			if (key === 'userRePassword' && !post[key] && !temp) {
				this.userRePasswordRegister.nativeElement.focus();
				temp = true;
			}
		});
	}
	checkControlPostRegister = (post: {
		userFirstName: string;
		userLastName: string;
		userEmail: string;
		userMobile: string;
		userPassword: string;
		userRePassword: string;
	}) => {
		let invalid = false;
		Object.keys(post).forEach((key: string) => {
			if (key === 'userFirstName' && !this.registerForm.get(`${key}`).value) {
				this.registerForm.get(`${key}`).setValidators([Validators.required]);
				this.registerForm.get(`${key}`).updateValueAndValidity({ onlySelf: true });
				return invalid = true;
			}
			if (key === 'userLastName' && !this.registerForm.get(`${key}`).value) {
				this.registerForm.get(`${key}`).setValidators([Validators.required]);
				this.registerForm.get(`${key}`).updateValueAndValidity({ onlySelf: true });
				return invalid = true;
			}
			if (key === 'userEmail' && !this.registerForm.get(`${key}`).value) {
				this.registerForm.get(`${key}`).setValidators([Validators.required, Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]);
				this.registerForm.get(`${key}`).updateValueAndValidity({ onlySelf: true });
				return invalid = true;
			}
			if (key === 'userMobile' && !this.registerForm.get(`${key}`).value) {
				this.registerForm.get(`${key}`).setValidators([Validators.required, Validators.pattern('^((\\+971-?)|0)?[0-9]{10}$')]);
				this.registerForm.get(`${key}`).updateValueAndValidity({ onlySelf: true });
				return invalid = true;
			}
			if (key === 'userPassword' && !this.registerForm.get(`${key}`).value) {
				this.registerForm.get(`${key}`).setValidators([Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/)]);
				this.registerForm.get(`${key}`).updateValueAndValidity({ onlySelf: true });
				return invalid = true;
			}
			if (key === 'userRePassword' && !this.registerForm.get(`${key}`).value) {
				this.registerForm.get(`${key}`).setValidators([Validators.required]);
				this.registerForm.get(`${key}`).updateValueAndValidity({ onlySelf: true });
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
	findInvalidControlsRegister = () => {
		const invalid = [];
		const controls = this.registerForm.controls;
		for (const name in controls) {
			if (controls[name].invalid) {
				invalid.push(name);
			}
		}
		return invalid;
	}
	ngOnInit(): void {
	}
	onClose = () => {
		this.bsModal.hide();
	}
}
