import { ChangeDetectionStrategy, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { State, user } from 'src/app';
import { AuthenticationService } from 'src/app/authentication.service';
import { User } from 'src/app/interface';
import { Login } from 'src/app/state/actions/login-register.actions';
import { SubSink } from 'subsink';
import { ForgotComponent } from '../forgot/forgot.component';
import { SignupComponent } from '../signup/signup.component';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styles: [
	],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnDestroy {
	hide_0 = true;
	logIn: FormGroup;
	auth$: Observable<{
		user: User,
		query: string,
		isSearch: boolean,
		errorMessage: string
	}> = this.store.select(user);
	bsModal: BsModalRef;
	subs = new SubSink();
	@ViewChild('userEmailLogin', { static: false }) userEmailLogin: ElementRef;
	@ViewChild('userPasswordLogin', { static: false }) userPasswordLogin: ElementRef;
	constructor(
		private modal: BsModalService,
		private fb: FormBuilder,
		private store: Store<State>,
		public auth: AuthenticationService
	) {
		// for Login
		this.logIn = this.fb.group({
			userEmail: ['', Validators.compose([Validators.pattern(/^(\d{10}|\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3}))$/)])],
			userPassword: [''],
			languageID: ['1'],
			terms: [true],
		});
		this.subs.add(this.auth.user.subscribe(u => {
			if (u && this.bsModal?.content) {
				this.bsModal.hide();
			}
		}));
	}
	ngOnDestroy(): void {
		this.subs.unsubscribe();
	}
	onClickLogin = (post: {
		userEmail: string;
		userPassword: string;
		terms: boolean;
	}) => {
		this.checkInputFocusLogin(post);
		if (!this.checkControlPostLogin(post)) {
			this.markFormTouched(this.logIn);
			if (this.logIn.valid && this.findInvalidControlsLogin().length === 0) {
				this.store.dispatch(new Login(JSON.stringify(post)));
			} else {
				this.logIn.controls.terms.setValue(false);
			}
		}
		if (this.checkControlPostLogin(post)) {
			this.markFormTouched(this.logIn);
		}
	}
	checkInputFocusLogin = (post: { userEmail: string; userPassword: string; terms: boolean; }) => {
		let temp = false;
		Object.keys(post).forEach((key) => {
			if (key === 'userEmail' && !post[key] && !temp) {
				this.userEmailLogin.nativeElement.focus();
				temp = true;
			}
			if (key === 'userPassword' && !post[key] && !temp) {
				this.userPasswordLogin.nativeElement.focus();
				temp = true;
			}
		});
	}
	checkControlPostLogin = (post: {
		userEmail: string;
		userPassword: string;
		terms: boolean;
	}): boolean => {
		let invalid = false;
		Object.keys(post).forEach((key: string) => {
			if (key === 'userEmail' && !this.logIn.get(`${key}`).value) {
				this.logIn.get(`${key}`).setValidators([Validators.required, Validators.pattern(/^(\d{10}|\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3}))$/)]);
				this.logIn.get(`${key}`).updateValueAndValidity({ onlySelf: true });
				return invalid = true;
			}
			if (key === 'userPassword' && !this.logIn.get(`${key}`).value) {
				this.logIn.get(`${key}`).setValidators([Validators.required]);
				this.logIn.get(`${key}`).updateValueAndValidity({ onlySelf: true });
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
	findInvalidControlsLogin = () => {
		const invalid = [];
		const controls = this.logIn.controls;
		for (const name in controls) {
			if (controls[name].invalid) {
				invalid.push(name);
			}
		}
		return invalid;
	}
	openForgot = () => {
		this.modal.show(ForgotComponent, {
			id: 2, backdrop: 'static',
			keyboard: false,
			animated: true,
			ignoreBackdropClick: true,
		});
	}
	openRegister = () => {
		this.bsModal = this.modal.show(SignupComponent, {
			id: 1, backdrop: 'static',
			keyboard: false,
			animated: true,
			ignoreBackdropClick: true,
		});
	}
}
