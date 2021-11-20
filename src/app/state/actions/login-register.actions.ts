import { Action } from '@ngrx/store';
import { USER_RESPONSE } from 'src/app/interface';

export enum AuthActionTypes {
	LOGIN = '[Auth] Login',
	LOGIN_FAILURE = '[Auth] LOGIN_FAILURE',
	LOGIN_RESET = '[Auth] LOGIN_RESET',
	LOGIN_NEW_QUERY = '[Auth] LOGIN_NEW_QUERY',
	LOGIN_ENDED_SUCCESS = '[Auth] LOGIN_ENDED_SUCCESS',
	LOGIN_START = '[Auth] LOGIN_START',
	REGISTER = '[Auth] REGISTER',
	REGISTER_FAILURE = '[Auth] REGISTER_FAILURE',
	REGISTER_RESET = '[Auth] REGISTER_RESET',
	REGISTER_NEW_QUERY = '[Auth] REGISTER_NEW_QUERY',
	REGISTER_ENDED_SUCCESS = '[Auth] REGISTER_ENDED_SUCCESS',
	REGISTER_START = '[Auth] REGISTER_START',
	FORGOT = '[Auth] FORGOT',
	FORGOT_FAILURE = '[Auth] FORGOT_FAILURE',
	FORGOT_RESET = '[Auth] FORGOT_RESET',
	FORGOT_NEW_QUERY = '[Auth] FORGOT_NEW_QUERY',
	FORGOT_ENDED_SUCCESS = '[Auth] FORGOT_ENDED_SUCCESS',
	FORGOT_START = '[Auth] FORGOT_START',
	VERIFY = '[Auth] VERIFY',
	VERIFY_FAILURE = '[Auth] VERIFY_FAILURE',
	VERIFY_RESET = '[Auth] VERIFY_RESET',
	VERIFY_NEW_QUERY = '[Auth] VERIFY_NEW_QUERY',
	VERIFY_ENDED_SUCCESS = '[Auth] VERIFY_ENDED_SUCCESS',
	VERIFY_START = '[Auth] VERIFY_START',
	RESET = '[Auth] RESET',
	RESET_FAILURE = '[Auth] RESET_FAILURE',
	RESET_RESET = '[Auth] RESET_RESET',
	RESET_NEW_QUERY = '[Auth] RESET_NEW_QUERY',
	RESET_ENDED_SUCCESS = '[Auth] RESET_ENDED_SUCCESS',
	RESET_START = '[Auth] RESET_START',
	UPLOAD = '[Auth] UPLOAD',
	UPLOAD_FAILURE = '[Auth] UPLOAD_FAILURE',
	UPLOAD_RESET = '[Auth] UPLOAD_RESET',
	UPLOAD_NEW_QUERY = '[Auth] UPLOAD_NEW_QUERY',
	UPLOAD_ENDED_SUCCESS = '[Auth] UPLOAD_ENDED_SUCCESS',
	UPLOAD_START = '[Auth] UPLOAD_START',
	UPDATE_PICTURE = '[Auth] UPDATE_PICTURE',
	UPDATE_PICTURE_FAILURE = '[Auth] UPDATE_PICTURE_FAILURE',
	UPDATE_PICTURE_RESET = '[Auth] UPDATE_PICTURE_RESET',
	UPDATE_PICTURE_NEW_QUERY = '[Auth] UPDATE_PICTURE_NEW_QUERY',
	UPDATE_PICTURE_ENDED_SUCCESS = '[Auth] UPDATE_PICTURE_ENDED_SUCCESS',
	UPDATE_PICTURE_START = '[Auth] UPDATE_PICTURE_START',
	UPDATE_PROFILE = '[Auth] UPDATE_PROFILE',
	UPDATE_PROFILE_FAILURE = '[Auth] UPDATE_PROFILE_FAILURE',
	UPDATE_PROFILE_RESET = '[Auth] UPDATE_PROFILE_RESET',
	UPDATE_PROFILE_NEW_QUERY = '[Auth] UPDATE_PROFILE_NEW_QUERY',
	UPDATE_PROFILE_ENDED_SUCCESS = '[Auth] UPDATE_PROFILE_ENDED_SUCCESS',
	UPDATE_PROFILE_START = '[Auth] UPDATE_PROFILE_START',
}

export class StartLogin implements Action {
	readonly type = AuthActionTypes.LOGIN_START;
	constructor(public query: string) { }
}
export class Login implements Action {
	readonly type = AuthActionTypes.LOGIN;
	constructor(public query: string) { }
}
export class LoginEndedSuccess implements Action {
	readonly type = AuthActionTypes.LOGIN_ENDED_SUCCESS;
	constructor(public payload: {
		data: USER_RESPONSE;
		message: string;
		status: string;
		query: string;
	}) { }
}
export class LoginNewQuery implements Action {
	readonly type = AuthActionTypes.LOGIN_NEW_QUERY;
	constructor(public query: string) { }
}
export class LoginFailure implements Action {
	readonly type = AuthActionTypes.LOGIN_FAILURE;
	constructor(public err: {
		data: USER_RESPONSE;
		message: string;
		status: string;
		query: string;
	}) { }
}
export class LoginReset implements Action {
	readonly type = AuthActionTypes.LOGIN_RESET;
	constructor(public query?: string) { }
}
export class StartRegister implements Action {
	readonly type = AuthActionTypes.REGISTER_START;
	constructor(public query: string) { }
}
export class Register implements Action {
	readonly type = AuthActionTypes.REGISTER;
	constructor(public query: string) { }
}
export class RegisterEndedSuccess implements Action {
	readonly type = AuthActionTypes.REGISTER_ENDED_SUCCESS;
	constructor(public payload: {
		data: USER_RESPONSE;
		message: string;
		status: string;
		query: string;
	}) { }
}
export class RegisterNewQuery implements Action {
	readonly type = AuthActionTypes.REGISTER_NEW_QUERY;
	constructor(public query: string) { }
}
export class RegisterFailure implements Action {
	readonly type = AuthActionTypes.REGISTER_FAILURE;
	constructor(public err: {
		data: USER_RESPONSE;
		message: string;
		status: string;
		query: string;
	}) { }
}
export class RegisterReset implements Action {
	readonly type = AuthActionTypes.REGISTER_RESET;
	constructor(public query?: string) { }
}
export class StartForgot implements Action {
	readonly type = AuthActionTypes.FORGOT_START;
	constructor(public query: string) { }
}
export class Forgot implements Action {
	readonly type = AuthActionTypes.FORGOT;
	constructor(public query: string) { }
}
export class ForgotEndedSuccess implements Action {
	readonly type = AuthActionTypes.FORGOT_ENDED_SUCCESS;
	constructor(public payload: {
		userMobile?: string;
		userID?: string;
		message: string;
		status: string;
		query: string;
	}) { }
}
export class ForgotNewQuery implements Action {
	readonly type = AuthActionTypes.FORGOT_NEW_QUERY;
	constructor(public query: string) { }
}
export class ForgotFailure implements Action {
	readonly type = AuthActionTypes.FORGOT_FAILURE;
	constructor(public err: {
		userMobile?: string;
		userID?: string;
		message: string;
		status: string;
		query: string;
	}) { }
}
export class ForgotReset implements Action {
	readonly type = AuthActionTypes.FORGOT_RESET;
	constructor(public query?: string) { }
}
export class StartVerify implements Action {
	readonly type = AuthActionTypes.VERIFY_START;
	constructor(public query: string) { }
}
export class Verify implements Action {
	readonly type = AuthActionTypes.VERIFY;
	constructor(public query: string) { }
}
export class VerifyEndedSuccess implements Action {
	readonly type = AuthActionTypes.VERIFY_ENDED_SUCCESS;
	constructor(public payload: {
		userMobile?: string;
		userID?: string;
		message: string;
		status: string;
		query: string;
	}) { }
}
export class VerifyNewQuery implements Action {
	readonly type = AuthActionTypes.VERIFY_NEW_QUERY;
	constructor(public query: string) { }
}
export class VerifyFailure implements Action {
	readonly type = AuthActionTypes.VERIFY_FAILURE;
	constructor(public err: {
		userMobile?: string;
		userID?: string;
		message: string;
		status: string;
		query: string;
	}) { }
}
export class VerifyReset implements Action {
	readonly type = AuthActionTypes.VERIFY_RESET;
	constructor(public query?: string) { }
}
export class StartReset implements Action {
	readonly type = AuthActionTypes.RESET_START;
	constructor(public query: string) { }
}
export class Reset implements Action {
	readonly type = AuthActionTypes.RESET;
	constructor(public query: string) { }
}
export class ResetEndedSuccess implements Action {
	readonly type = AuthActionTypes.RESET_ENDED_SUCCESS;
	constructor(public payload: {
		data: USER_RESPONSE;
		message: string;
		status: string;
		query: string;
	}) { }
}
export class ResetNewQuery implements Action {
	readonly type = AuthActionTypes.RESET_NEW_QUERY;
	constructor(public query: string) { }
}
export class ResetFailure implements Action {
	readonly type = AuthActionTypes.RESET_FAILURE;
	constructor(public err: {
		data: USER_RESPONSE;
		message: string;
		status: string;
		query: string;
	}) { }
}
export class ResetReset implements Action {
	readonly type = AuthActionTypes.RESET_RESET;
	constructor(public query?: string) { }
}
export class StartUpload implements Action {
	readonly type = AuthActionTypes.UPLOAD_START;
	constructor(public query: {
		file: File;
		fileName: string;
		filePath: string;
		loginuserID: string;
		languageID: string;
	}) { }
}
export class Upload implements Action {
	readonly type = AuthActionTypes.UPLOAD;
	constructor(public query: {
		file: File;
		fileName: string;
		filePath: string;
		loginuserID: string;
		languageID: string;
	}) { }
}
export class UploadEndedSuccess implements Action {
	readonly type = AuthActionTypes.UPLOAD_ENDED_SUCCESS;
	constructor(public payload: {
		fileName: string;
		message: string;
		status: string;
		query: string;
	}) { }
}
export class UploadNewQuery implements Action {
	readonly type = AuthActionTypes.UPLOAD_NEW_QUERY;
	constructor(public query: {
		file: File;
		fileName: string;
		filePath: string;
		loginuserID: string;
		languageID: string;
	}) { }
}
export class UploadFailure implements Action {
	readonly type = AuthActionTypes.UPLOAD_FAILURE;
	constructor(public err: {
		fileName: string;
		message: string;
		status: string;
		query: string;
	}) { }
}
export class UploadReset implements Action {
	readonly type = AuthActionTypes.UPLOAD_RESET;
	constructor(public query?: {
		file: File;
		fileName: string;
		filePath: string;
		loginuserID: string;
		languageID: string;
	}) { }
}
export class StartUpdatePicture implements Action {
	readonly type = AuthActionTypes.UPDATE_PICTURE_START;
	constructor(public query: string) { }
}
export class UpdatePicture implements Action {
	readonly type = AuthActionTypes.UPDATE_PICTURE;
	constructor(public query: string) { }
}
export class UpdatePictureEndedSuccess implements Action {
	readonly type = AuthActionTypes.UPDATE_PICTURE_ENDED_SUCCESS;
	constructor(public payload: {
		fileName: string;
		message: string;
		status: string;
		query: string;
	}) { }
}
export class UpdatePictureNewQuery implements Action {
	readonly type = AuthActionTypes.UPDATE_PICTURE_NEW_QUERY;
	constructor(public query: string) { }
}
export class UpdatePictureFailure implements Action {
	readonly type = AuthActionTypes.UPDATE_PICTURE_FAILURE;
	constructor(public err: {
		fileName: string;
		message: string;
		status: string;
		query: string;
	}) { }
}
export class UpdatePictureReset implements Action {
	readonly type = AuthActionTypes.UPDATE_PICTURE_RESET;
	constructor(public query?: string) { }
}
export class StartUpdateProfile implements Action {
	readonly type = AuthActionTypes.UPDATE_PROFILE_START;
	constructor(public query: string) { }
}
export class UpdateProfile implements Action {
	readonly type = AuthActionTypes.UPDATE_PROFILE;
	constructor(public query: string) { }
}
export class UpdateProfileEndedSuccess implements Action {
	readonly type = AuthActionTypes.UPDATE_PROFILE_ENDED_SUCCESS;
	constructor(public payload: {
		data: USER_RESPONSE;
		message: string;
		status: string;
		query: string;
	}) { }
}
export class UpdateProfileNewQuery implements Action {
	readonly type = AuthActionTypes.UPDATE_PROFILE_NEW_QUERY;
	constructor(public query: string) { }
}
export class UpdateProfileFailure implements Action {
	readonly type = AuthActionTypes.UPDATE_PROFILE_FAILURE;
	constructor(public err: {
		data: USER_RESPONSE;
		message: string;
		status: string;
		query: string;
	}) { }
}
export class UpdateProfileReset implements Action {
	readonly type = AuthActionTypes.UPDATE_PROFILE_RESET;
	constructor(public query?: string) { }
}

export type All =
	| Login
	| LoginReset
	| LoginFailure
	| LoginNewQuery
	| StartLogin
	| LoginEndedSuccess
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
	| ResetEndedSuccess
	| Upload
	| UploadReset
	| UploadFailure
	| UploadNewQuery
	| StartUpload
	| UploadEndedSuccess
	| UpdatePicture
	| UpdatePictureReset
	| UpdatePictureFailure
	| UpdatePictureNewQuery
	| StartUpdatePicture
	| UpdatePictureEndedSuccess
	| UpdateProfile
	| UpdateProfileReset
	| UpdateProfileFailure
	| UpdateProfileNewQuery
	| StartUpdateProfile
	| UpdateProfileEndedSuccess;
