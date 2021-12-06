import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';
import { catchError, map, retry, shareReplay } from 'rxjs/operators';
import { Token, User } from './interface';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
	// urls
	registration = '/auth/signup';
	login = '/auth/login';
	forget = '/auth/forgot-password';
	reset = '/auth/reset-password';
	otpVerify = '/auth/otp-verification';
	otpResend = '/users/otp-resend';
	changeUrl = '/users/user-change-password';
	// user-subject
	userSubject: BehaviorSubject<User>;
	user: Observable<User>;
	SNACKBAR$: Subject<{ textLabel: string; status: string; timeoutMs: number }> = new BehaviorSubject<{ textLabel: string; status: string; timeoutMs: number }>({ textLabel: '', status: '', timeoutMs: 5000 });
	SHOW_SNACKBAR$ = this.SNACKBAR$.asObservable();

	constructor(
		private router: Router,
		private http: HttpClient) {
		this.userSubject = new BehaviorSubject<User>(JSON.parse(sessionStorage.getItem('USER_LOGGED') ? sessionStorage.getItem('USER_LOGGED') : localStorage.getItem('USER_LOGGED')));
		this.user = this.userSubject.asObservable();
	}

	httpOptions = {
		headers: new HttpHeaders({
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
		})
	};

	// User
	get_session = (): string | null => {
		return sessionStorage.getItem('USER_LOGGED') ? sessionStorage.getItem('USER_LOGGED') : localStorage.getItem('USER_LOGGED');
	}
	is_authenticated(): boolean {
		const token = this.get_session();
		return typeof (token) === 'string' ? true : false;
	}

	get userValue(): User {
		return this.userSubject.value;
	}

	signIn = (item: string): Observable<{
		data: User[];
		tokens: Token;
		status: string;
		message: string;
	}> => {
		const params = new HttpParams()
			.set('userEmail', JSON.parse(item).userEmail)
			.set('userPassword', JSON.parse(item).userPassword);
		return this.http
			.post<{
				data: User[];
				tokens: Token;
				status: string;
				message: string;
			}[]>(this.login, params, this.httpOptions)
			.pipe(map(r => r[0]), shareReplay(), retry(2), catchError(this.handleError));
	}

	forgot = (item: string): Observable<{
		data: { userID: string, userMobile: string }[]
		message: string;
		status: string
	}> => {
		const params = new HttpParams()
			.set('userEmail', JSON.parse(item).userEmail)
			.set('userMobile', JSON.parse(item).userMobile);
		return this.http
			.post<{
				data: { userID: string, userMobile: string }[]
				message: string;
				status: string
			}[]>(this.forget, params, this.httpOptions)
			.pipe(map(r => r[0]), shareReplay(), retry(2), catchError(this.handleError));
	}

	otpVerification = (item: string): Observable<{
		data: User[];
		status: string;
		message: string;
	}> => {
		const params = new HttpParams()
			.set('userID', JSON.parse(item).userID)
			.set('userOTP', JSON.parse(item).userOTP);
		return this.http
			.post<{
				data: User[];
				status: string;
				message: string;
			}[]>(this.otpVerify, params, this.httpOptions)
			.pipe(map(r => r[0]), shareReplay(), retry(2), catchError(this.handleError));
	}

	otpResendVerification = (item: string): Observable<string> => {
		const params = new HttpParams()
			.set('email', JSON.parse(item).email)
			.set('password', JSON.parse(item).password);
		return this.http
			.post<{
				status: string;
				message: string;
			}[]>(this.otpResend, params, this.httpOptions)
			.pipe(map(r => r[0].status), shareReplay(), retry(2), catchError(this.handleError));
	}

	resetPassword = (item: string): Observable<{
		data: User[];
		status: string;
		message: string;
	}> => {
		const params = new HttpParams()
			.set('userID', JSON.parse(item).userID)
			.set('userPassword', JSON.parse(item).userNewPassword);
		return this.http
			.post<{
				data: User[];
				status: string;
				message: string;
			}[]>(this.reset, params, this.httpOptions)
			.pipe(map(r => r[0]), shareReplay(), retry(2), catchError(this.handleError));
	}

	changePassword = (item: string): Observable<{
		status: string;
		message: string;
	}> => {
		const params = new HttpParams()
			.set('email', JSON.parse(item).email)
			.set('password', JSON.parse(item).password);
		return this.http
			.post<{
				status: string;
				message: string;
			}[]>(this.changeUrl, params, this.httpOptions)
			.pipe(map(r => r[0]), shareReplay(), retry(2), catchError(this.handleError));
	}

	signup = (item: string): Observable<{
		data: User[];
		status: string;
		message: string;
	}> => {
		const params = new HttpParams()
			.set('userFirstName', JSON.parse(item).userFirstName)
			.set('userLastName', JSON.parse(item).userLastName)
			.set('userEmail', JSON.parse(item).userEmail)
			.set('userPassword', JSON.parse(item).userPassword)
			.set('userCountryCode', JSON.parse(item).userCountryCode)
			.set('userMobile', JSON.parse(item).userMobile)
			.set('userProfilePicture', JSON.parse(item).userProfilePicture)
			.set('userDeviceType', 'web')
			.set('userDeviceID', 'xxyyzzz')
			.set('apiType', 'web')
			.set('apiVersion', '1.0');
		return this.http
			.post<{
				data: User[];
				status: string;
				message: string;
			}[]>(this.registration, params, this.httpOptions)
			.pipe(map(r => r[0]), shareReplay(), retry(2), catchError(this.handleError));
	}

	logout = () => {
		// remove user from local storage to log user out
		sessionStorage.removeItem('USER_LOGGED');
		localStorage.removeItem('USER_LOGGED');
		localStorage.removeItem('tempCart');
		this.userSubject.next({
			userID: '',
			userFirstName: '',
			userLastName: '',
			userEmail: '',
			userCountryCode: '',
			userMobile: '',
			userPassword: '',
			userProfilePicture: '',
			languageID: '',
			userDeviceType: '',
			userDeviceID: '',
			userVerified: '',
			userStatus: '',
			userOTP: '',
			userDOB: '',
			userCreatedDate: '',
			languageName: '',
			chats: null
		});
		if (window.sessionStorage) { sessionStorage.clear(); }
		if (this.router.url.startsWith('/user')) {
			this.router.navigate(['/'], { replaceUrl: true });
		}
	}

	updateUser = (user: User) => {
		this.userSubject.next(user);
	}

	// ErrorHandling
	handleError = (error: {
		error: { messages: string };
		status: any;
		messsage: any;
	}) => {
		let errorMessage = '';
		if (error.error instanceof ErrorEvent) {
			errorMessage = error.error.messages;
		} else {
			errorMessage = `Error Code : ${error.status}\nMessage : ${error.messsage}`;
		}
		return throwError(errorMessage);
	}
}
