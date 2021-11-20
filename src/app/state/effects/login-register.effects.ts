import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, take, tap, withLatestFrom } from 'rxjs/operators';
import { State } from 'src/app';
import { AuthenticationService } from 'src/app/authentication.service';
import { AuthActionTypes, Forgot, ForgotEndedSuccess, ForgotFailure, ForgotNewQuery, ForgotReset, Login, LoginEndedSuccess, LoginFailure, LoginNewQuery, LoginReset, Register, RegisterEndedSuccess, RegisterFailure, RegisterNewQuery, RegisterReset, Reset, ResetEndedSuccess, ResetFailure, ResetNewQuery, ResetReset, StartForgot, StartLogin, StartRegister, StartReset, StartVerify, Verify, VerifyEndedSuccess, VerifyFailure, VerifyNewQuery, VerifyReset } from '../actions/login-register.actions';

@Injectable()
export class AuthEffects {
	LOGIN_INITIAL$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(AuthActionTypes.LOGIN),
			tap((r) => new LoginReset(r.query)),
			map((a) => new StartLogin(a.query)));
	});
	LOGIN_NEXT$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(AuthActionTypes.LOGIN_NEW_QUERY),
			tap((r) => new LoginReset(r.query)),
			map((a) => new StartLogin(a.query)));
	});
	FETCH_LOGIN$ = createEffect((): Observable<LoginEndedSuccess> => {
		return this.actions$.pipe(
			ofType(AuthActionTypes.LOGIN_START),
			withLatestFrom(this.store.select(state => state.auth)),
			switchMap(action => this.root.signIn(action[0].query).pipe(
				map(data => new LoginEndedSuccess(data.status === 'true' ? {
					data: data?.data[0],
					message: data?.message,
					status: data?.status,
					query: action[0].query
				} : {
					data: null,
					message: 'Incorrect email or password.',
					status: 'false',
					query: action[0]?.query
				}),
					catchError(() => of(new LoginFailure({
						data: null,
						message: 'Incorrect email or password.',
						status: 'false',
						query: action[0]?.query
					})))
				), take(1))
			)
		);
	});
	SUCCESS_LOGIN$ = createEffect(() => {
		return this.actions$.pipe(ofType(AuthActionTypes.LOGIN_ENDED_SUCCESS),
			map((a) => {
				if (a?.payload?.status === 'true') {
					this.root.SNACKBAR$.next({ textLabel: 'Logged in successfully.', status: 'login' });
					if (JSON.parse(a.payload.query)?.terms === true) {
						this.root.updateUser(a.payload.data);
						localStorage.setItem('USER_LOGGED', JSON.stringify(a?.payload?.data));
						sessionStorage.removeItem('USER_LOGGED');
					} else {
						this.root.updateUser(a.payload.data);
						sessionStorage.setItem('USER_LOGGED', JSON.stringify(a?.payload?.data));
						localStorage.removeItem('USER_LOGGED');
					}
					setTimeout(() => {
						this.router.navigate(['/user'], { replaceUrl: true });
					}, 200);
				}
			})
		);
	},
		{
			dispatch: false
		});
	REGISTER_INITIAL$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(AuthActionTypes.REGISTER),
			tap((r) => new RegisterReset(r.query)),
			map((a) => new StartRegister(a.query)));
	});
	REGISTER_NEXT$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(AuthActionTypes.REGISTER_NEW_QUERY),
			tap((r) => new RegisterReset(r.query)),
			map((a) => new StartRegister(a.query)));
	});
	FETCH_REGISTER$ = createEffect((): Observable<RegisterEndedSuccess> => {
		return this.actions$.pipe(
			ofType(AuthActionTypes.REGISTER_START),
			withLatestFrom(this.store.select(state => state.auth)),
			switchMap(action => this.root.signup(action[0].query).pipe(
				map(data => new RegisterEndedSuccess(data.status === 'true' ? {
					data: data?.data[0],
					message: data?.message,
					status: data?.status,
					query: action[0].query
				} : {
					data: null,
					message: data?.message,
					status: 'false',
					query: action[0]?.query
				}),
					catchError(() => of(new RegisterFailure({
						data: null,
						message: 'Incorrect email or password.',
						status: 'false',
						query: action[0]?.query
					})))
				), take(1))
			)
		);
	});
	SUCCESS_REGISTER$ = createEffect(() => {
		return this.actions$.pipe(ofType(AuthActionTypes.REGISTER_ENDED_SUCCESS),
			map((a) => {
				if (a?.payload?.status === 'true') {
					this.root.updateUser(a.payload.data);
					this.root.SNACKBAR$.next({ textLabel: 'You have successfully registered.', status: 'register' });
					sessionStorage.setItem('USER_LOGGED', JSON.stringify(a?.payload?.data));
					localStorage.removeItem('USER_LOGGED');
				}
			})
		);
	},
		{
			dispatch: false
		});
	FORGOT_INITIAL$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(AuthActionTypes.FORGOT),
			tap((r) => new ForgotReset(r.query)),
			map((a) => new StartForgot(a.query)));
	});
	FORGOT_NEXT$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(AuthActionTypes.FORGOT_NEW_QUERY),
			tap((r) => new ForgotReset(r.query)),
			map((a) => new StartForgot(a.query)));
	});
	FETCH_FORGOT$ = createEffect((): Observable<ForgotEndedSuccess> => {
		return this.actions$.pipe(
			ofType(AuthActionTypes.FORGOT_START),
			withLatestFrom(this.store.select(state => state.auth)),
			switchMap(action => this.root.forgot(action[0].query).pipe(
				map(data => new ForgotEndedSuccess(data.status === 'true' ? {
					userMobile: data?.data[0]?.userMobile,
					userID: data?.data[0]?.userID,
					message: data?.message,
					status: data?.status,
					query: action[0].query
				} : {
					userMobile: '',
					userID: '',
					message: 'Incorrect email and/or phone.',
					status: 'false',
					query: action[0]?.query
				}),
					catchError(() => of(new ForgotFailure({
						userMobile: '',
						userID: '',
						message: 'Incorrect email and/or phone.',
						status: 'false',
						query: action[0]?.query
					})))
				), take(1))
			)
		);
	});
	SUCCESS_FORGOT$ = createEffect(() => {
		return this.actions$.pipe(ofType(AuthActionTypes.FORGOT_ENDED_SUCCESS),
			map((a) => {
				if (a?.payload?.status === 'true') {
					if (!isNaN(+JSON.parse(a.payload.query)?.userEmail)) {
						this.root.SNACKBAR$.next({ textLabel: 'We have sent otp on your registered mobile.', status: 'forgot' });
					} else {
						this.root.SNACKBAR$.next({ textLabel: 'We have sent otp on your registered email.', status: 'forgot' });
					}
				}
			})
		);
	},
		{
			dispatch: false
		});
	VERIFY_INITIAL$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(AuthActionTypes.VERIFY),
			tap((r) => new VerifyReset(r.query)),
			map((a) => new StartVerify(a.query)));
	});
	VERIFY_NEXT$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(AuthActionTypes.VERIFY_NEW_QUERY),
			tap((r) => new VerifyReset(r.query)),
			map((a) => new StartVerify(a.query)));
	});
	FETCH_VERIFY$ = createEffect((): Observable<VerifyEndedSuccess> => {
		return this.actions$.pipe(
			ofType(AuthActionTypes.VERIFY_START),
			withLatestFrom(this.store.select(state => state.auth)),
			switchMap(action => this.root.otpVerification(action[0].query).pipe(
				map(data => new VerifyEndedSuccess(data.status === 'true' ? {
					userMobile: data?.data[0]?.userMobile,
					userID: data?.data[0]?.userID,
					message: data?.message,
					status: data?.status,
					query: action[0].query
				} : {
					userMobile: '',
					userID: '',
					message: 'Invalid OTP.',
					status: 'false',
					query: action[0]?.query
				}),
					catchError(() => of(new VerifyFailure({
						userMobile: '',
						userID: '',
						message: 'Invalid OTP.',
						status: 'false',
						query: action[0]?.query
					})))
				), take(1))
			)
		);
	});
	SUCCESS_VERIFY$ = createEffect(() => {
		return this.actions$.pipe(ofType(AuthActionTypes.VERIFY_ENDED_SUCCESS),
			map((a) => {
				if (a?.payload?.status === 'true') {
					this.root.SNACKBAR$.next({ textLabel: 'OTP verified successfully.', status: 'verify' });
				}
			})
		);
	},
		{
			dispatch: false
		});
	RESET_INITIAL$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(AuthActionTypes.RESET),
			tap((r) => new ResetReset(r.query)),
			map((a) => new StartReset(a.query)));
	});
	RESET_NEXT$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(AuthActionTypes.RESET_NEW_QUERY),
			tap((r) => new ResetReset(r.query)),
			map((a) => new StartReset(a.query)));
	});
	FETCH_RESET$ = createEffect((): Observable<ResetEndedSuccess> => {
		return this.actions$.pipe(
			ofType(AuthActionTypes.RESET_START),
			withLatestFrom(this.store.select(state => state.auth)),
			switchMap(action => this.root.resetPassword(action[0].query).pipe(
				map(data => new ResetEndedSuccess(data.status === 'true' ? {
					data: data?.data[0],
					message: data?.message,
					status: data?.status,
					query: action[0].query
				} : {
					data: null,
					message: 'Opps! Something went wrong.',
					status: 'false',
					query: action[0]?.query
				}),
					catchError(() => of(new ResetFailure({
						data: null,
						message: 'Opps! Something went wrong.',
						status: 'false',
						query: action[0]?.query
					})))
				), take(1))
			)
		);
	});
	SUCCESS_RESET$ = createEffect(() => {
		return this.actions$.pipe(ofType(AuthActionTypes.RESET_ENDED_SUCCESS),
			map((a) => {
				if (a?.payload?.status === 'true') {
					this.root.updateUser(a.payload.data);
					localStorage.removeItem('USER_LOGGED');
					sessionStorage.setItem('USER_LOGGED', JSON.stringify(a?.payload?.data));
					this.root.SNACKBAR$.next({ textLabel: 'Password updated successfully.', status: 'reset' });
				}
			})
		);
	},
		{
			dispatch: false
		});
	constructor(
		private actions$: Actions<
			| Login
			| LoginReset
			| LoginEndedSuccess
			| LoginFailure
			| StartLogin
			| LoginNewQuery
			| Register
			| RegisterReset
			| RegisterFailure
			| RegisterNewQuery
			| StartRegister
			| RegisterEndedSuccess
			| Forgot
			| ForgotReset
			| ForgotFailure
			| ForgotNewQuery
			| StartForgot
			| ForgotEndedSuccess
			| Verify
			| VerifyReset
			| VerifyFailure
			| VerifyNewQuery
			| StartVerify
			| VerifyEndedSuccess
			| Reset
			| ResetReset
			| ResetFailure
			| ResetNewQuery
			| StartReset
			| ResetEndedSuccess>,
		private root: AuthenticationService,
		private router: Router,
		private store: Store<State>) { }

}
