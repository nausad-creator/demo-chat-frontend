import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { shareReplay, retry, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ApiResponse } from './app.interface';
const CACHE_SIZE = 1;
@Injectable({
	providedIn: 'root'
})
export class RootService {
	// Variables Declaration Of Type Observable
	private about$: Observable<Array<ApiResponse>>;
	private terms$: Observable<Array<ApiResponse>>;
	private policy$!: Observable<Array<ApiResponse>>;
	private faq$!: Observable<Array<ApiResponse>>;
	// faculty url's
	private loginUrl = '/faculty/faculty-login-password';
	private forgetPassUlr = '/faculty/faculty-forgot-password';
	private resetPassUrl = '/faculty/reset-password';
	private otpVerUrl = '/faculty/otp-verification';
	private resendUrl = '/faculty/otp-resend';
	private updateProfilePicUrl = '/faculty/faculty-update-profile-picture';
	private updateProfileUrl = '/faculty/faculty-update-profile';
	private changePasswordUrl = '/faculty/change-password';
	// cms url's
	private cmsPageUrl = '/cmspage/get-cmspage';
	private faqUrl = '/faq/faq-list';

	constructor(private http: HttpClient) { }

	httpOptions = {
		headers: new HttpHeaders({})
	};

	signIn = (item: string): Observable<Array<ApiResponse>> => {
		const form = new FormData();
		const json = `[{
		"languageID": "${JSON.parse(item).languageID}",
		"facultyPassword": "${JSON.parse(item).facultyPassword}",
		"facultyMobile": "${JSON.parse(item).facultyMobile}",
		"facultyDeviceID": "token",
		"apiType": "Android",
		"apiVersion": "1.0"
		}]`;
		form.append('json', json);
		return this.http
			.post<Array<ApiResponse>>(`${environment.apiBaseUrl}${this.loginUrl}`, form, this.httpOptions)
			.pipe(shareReplay(), retry(2), catchError(this.handleError));
	}
	updateProfile = (data: string): Observable<Array<ApiResponse>> => {
		const form = new FormData();
		const json = `[{
		"languageID": "${JSON.parse(data).languageID}",
		"loginfacultyID":"${JSON.parse(data).loginfacultyID}",
		"facultyDOB":"${JSON.parse(data).facultyDOB}",
		"facultyEmail":"${JSON.parse(data).facultyEmail}",
		"facultyMobile":"${JSON.parse(data).facultyMobile}",
		"facultyFullName":"${JSON.parse(data).facultyFullName}",
		"facultyGender":"${JSON.parse(data).facultyGender}",
		"facultyProfilePicture":"${JSON.parse(data).facultyProfilePicture}",
		"facultyAddress":"${JSON.parse(data).facultyAddress}",
		"facultyPincode":"${JSON.parse(data).facultyPincode}",
		"facultyDeviceType": "Android",
		"facultyDeviceID": "token",
		"countryID":"${JSON.parse(data).countryID}",
		"stateID":"${JSON.parse(data).stateID}",
		"cityID":"${JSON.parse(data).cityID}",
		"apiType": "Android",
		"apiVersion": "1.0"
		}]`;
		form.append('json', json);
		return this.http
			.post<Array<ApiResponse>>(`${environment.apiBaseUrl}${this.updateProfileUrl}`, form, this.httpOptions)
			.pipe(shareReplay(), retry(2), catchError(this.handleError));
	}
	updateProfilePic = (data: string): Observable<Array<ApiResponse>> => {
		const form = new FormData();
		const json = `[{
		"languageID":"${JSON.parse(data).languageID}",
		"loginfacultyID":"${JSON.parse(data).facultyID}",
		"facultyProfilePicture":"${JSON.parse(data).picture}",
		"apiType":"Android",
		"apiVersion":"1.0"
		}]`;
		form.append('json', json);
		return this.http
			.post<Array<ApiResponse>>(`${environment.apiBaseUrl}${this.updateProfilePicUrl}`, form, this.httpOptions)
			.pipe(shareReplay(), retry(2), catchError(this.handleError));
	}
	forgetPassword = (item: string): Observable<Array<ApiResponse>> => {
		const form = new FormData();
		const json = `[{
		"languageID": "${JSON.parse(item).languageID}",
		"facultyEmail": "${JSON.parse(item).facultyEmail}",
		"facultyMobile": "${JSON.parse(item).facultyMobile}",
		"apiType": "Android",
		"apiVersion": "1.0"
		}]`;
		form.append('json', json);
		return this.http
			.post<Array<ApiResponse>>(`${environment.apiBaseUrl}${this.forgetPassUlr}`, form, this.httpOptions)
			.pipe(shareReplay(), retry(2), catchError(this.handleError));
	}
	resetPassword = (item: string): Observable<Array<ApiResponse>> => {
		const form = new FormData();
		const json = `[{
		"loginfacultyID": "${JSON.parse(item).loginfacultyID}",
		"languageID": "${JSON.parse(item).languageID}",
		"facultyNewPassword": "${JSON.parse(item).facultyNewPassword}",
		"apiType": "Android",
		"apiVersion": "1.0"
		}]`;
		form.append('json', json);
		return this.http
			.post<Array<ApiResponse>>(`${environment.apiBaseUrl}${this.resetPassUrl}`, form, this.httpOptions)
			.pipe(shareReplay(), retry(2), catchError(this.handleError));
	}
	OTPverify = (item: string): Observable<Array<ApiResponse>> => {
		const form = new FormData();
		const json = `[{
		"languageID": "${JSON.parse(item).languageID}",
		"loginfacultyID": "${JSON.parse(item).loginfacultyID}",
		"facultyOTP": "${JSON.parse(item).facultyOTP}",
		"facultyDeviceID": "token",
		"apiType": "Android",
		"apiVersion": "1.0"
		}]`;
		form.append('json', json);
		return this.http
			.post<Array<ApiResponse>>(`${environment.apiBaseUrl}${this.otpVerUrl}`, form, this.httpOptions)
			.pipe(shareReplay(), retry(2), catchError(this.handleError));
	}
	resendOTP = (item: string): Observable<Array<ApiResponse>> => {
		const form = new FormData();
		const json = `[{
		"languageID": "${JSON.parse(item).languageID}",
		"loginfacultyID": "${JSON.parse(item).loginfacultyID}",
		"facultyMobile":"${JSON.parse(item).facultyMobile}",
		"facultyDeviceID": "token",
		"apiType": "Android",
		"apiVersion": "1.0"
		}]`;
		form.append('json', json);
		return this.http
			.post<Array<ApiResponse>>(`${environment.apiBaseUrl}${this.resendUrl}`, form, this.httpOptions)
			.pipe(shareReplay(), retry(2), catchError(this.handleError));
	}
	changePassword = (data: string): Observable<Array<ApiResponse>> => {
		const form = new FormData();
		const json = `[{
		"loginfacultyID": "${JSON.parse(data).loginfacultyID}",
		"facultyCurrentPassword": "${JSON.parse(data).facultyCurrentPassword}",
		"languageID": "${JSON.parse(data).languageID}",
		"facultyNewPassword": "${JSON.parse(data).facultyNewPassword}",
		"apiType": "Android",
		"apiVersion": "1.0"
		}]`;
		form.append('json', json);
		return this.http
			.post<Array<ApiResponse>>(`${environment.apiBaseUrl}${this.changePasswordUrl}`, form, this.httpOptions)
			.pipe(shareReplay(), retry(2), catchError(this.handleError));
	}
	get about(): Observable<Array<ApiResponse>> {
		if (!this.about$) {
			this.about$ = this.cmsPage('aboutus').pipe(shareReplay(CACHE_SIZE));
		}
		return this.about$;
	}
	get policy(): Observable<Array<ApiResponse>> {
		if (!this.policy$) {
			this.policy$ = this.cmsPage('privacypolicy').pipe(shareReplay(CACHE_SIZE));
		}
		return this.policy$;
	}
	get terms(): Observable<Array<ApiResponse>> {
		if (!this.terms$) {
			this.terms$ = this.cmsPage('Termsandcondions').pipe(shareReplay(CACHE_SIZE));
		}
		return this.terms$;
	}
	cmsPage = (code: string): Observable<Array<ApiResponse>> => {
		const form = new FormData();
		const json = `[{
		"loginuserID": "1",
		"languageID": "1",
		"cmspageConstantCode": "${code}",
		"apiType": "Android",
		"apiVersion": "1.0"
		}]`;
		form.append('json', json);
		return this.http
			.post<Array<ApiResponse>>(`${environment.apiBaseUrl}${this.cmsPageUrl}`, form, this.httpOptions)
			.pipe(retry(2), catchError(this.handleError));
	}
	get faqs(): Observable<Array<ApiResponse>> {
		if (!this.faq$) {
			this.faq$ = this.faq().pipe(shareReplay(CACHE_SIZE));
		}
		return this.faq$;
	}
	faq = (): Observable<Array<ApiResponse>> => {
		const form = new FormData();
		const json = `[{
		"languageID": "1",
		"faqtypeID": "",
		"apiVersion": "1.0",
		"apiType": "Android"
		}]`;
		form.append('json', json);
		return this.http
			.post<Array<ApiResponse>>(`${environment.apiBaseUrl}${this.faqUrl}`, form, this.httpOptions)
			.pipe(retry(2), catchError(this.handleError));
	}
	// ErrorHandling
	handleError = (error: { error: { messages: string; }; status: any; messsage: any; }) => {
		let errorMessage = '';
		if (error.error instanceof ErrorEvent) {
			errorMessage = error.error.messages;
		} else {
			errorMessage = `Error Code : ${error.status}\nMessage : ${error.messsage}`;
		}
		return throwError(errorMessage);
	}
}
