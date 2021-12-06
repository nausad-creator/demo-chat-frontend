import { User } from 'src/app/interface';
import { All, AuthActionTypes } from '../actions/login-register.actions';

// user login
export interface UserLoginRegister {
	user: User;
	errorMessage: string;
	query: string;
	userMobile?: string;
	userID?: string;
	isSearch: boolean;
}
export const initial: UserLoginRegister = {
	user: null,
	errorMessage: '',
	query: '',
	userMobile: '',
	userID: '',
	isSearch: false
};
export function reducerAuth(state = initial, action: All): UserLoginRegister {
	switch (action.type) {
		case AuthActionTypes.LOGIN_NEW_QUERY:
			return Object.assign({}, state, {
				query: action?.query,
				isSearch: true
			});
		case AuthActionTypes.LOGIN_START:
			return {
				...state,
				isSearch: true
			};
		case AuthActionTypes.LOGIN_ENDED_SUCCESS:
			return Object.assign({}, state, {
				user: action?.payload?.data,
				errorMessage: action?.payload?.message,
				isSearch: false
			});
		case AuthActionTypes.LOGIN:
			return Object.assign({}, state, {
				query: action?.query,
				errorMessage: '',
				isSearch: true
			});
		case AuthActionTypes.LOGIN_RESET:
			return Object.assign({}, state, {
				user: null,
				errorMessage: '',
				isSearch: false
			});
		case AuthActionTypes.LOGIN_FAILURE:
			return Object.assign({}, state, {
				user: null,
				errorMessage: 'Incorrect email and/or password.',
				isSearch: false
			});
		case AuthActionTypes.REGISTER_NEW_QUERY:
			return Object.assign({}, state, {
				query: action?.query,
				isSearch: true
			});
		case AuthActionTypes.REGISTER_START:
			return {
				...state,
				isSearch: true
			};
		case AuthActionTypes.REGISTER_ENDED_SUCCESS:
			return Object.assign({}, state, {
				user: action?.payload?.data,
				errorMessage: action?.payload?.message,
				isSearch: false
			});
		case AuthActionTypes.REGISTER:
			return Object.assign({}, state, {
				query: action?.query,
				errorMessage: '',
				isSearch: true
			});
		case AuthActionTypes.REGISTER_RESET:
			return Object.assign({}, state, {
				user: null,
				errorMessage: '',
				isSearch: false
			});
		case AuthActionTypes.REGISTER_FAILURE:
			return Object.assign({}, state, {
				user: null,
				errorMessage: 'Opps! Something went wrong.',
				isSearch: false
			});
		case AuthActionTypes.FORGOT_NEW_QUERY:
			return Object.assign({}, state, {
				query: action?.query,
				isSearch: true
			});
		case AuthActionTypes.FORGOT_START:
			return {
				...state,
				isSearch: true
			};
		case AuthActionTypes.FORGOT_ENDED_SUCCESS:
			return Object.assign({}, state, {
				userMobile: action?.payload?.userMobile,
				userID: action?.payload?.userID,
				errorMessage: action?.payload?.message,
				isSearch: false
			});
		case AuthActionTypes.FORGOT:
			return Object.assign({}, state, {
				query: action?.query,
				errorMessage: '',
				isSearch: true
			});
		case AuthActionTypes.FORGOT_RESET:
			return Object.assign({}, state, {
				user: null,
				errorMessage: '',
				isSearch: false
			});
		case AuthActionTypes.FORGOT_FAILURE:
			return Object.assign({}, state, {
				user: null,
				errorMessage: 'Incorrect email and/or phone.',
				isSearch: false
			});
		case AuthActionTypes.VERIFY_NEW_QUERY:
			return Object.assign({}, state, {
				query: action?.query,
				isSearch: true
			});
		case AuthActionTypes.VERIFY_START:
			return {
				...state,
				isSearch: true
			};
		case AuthActionTypes.VERIFY_ENDED_SUCCESS:
			return Object.assign({}, state, {
				userMobile: action?.payload?.userMobile,
				userID: action?.payload?.userID,
				errorMessage: action?.payload?.message,
				isSearch: false
			});
		case AuthActionTypes.VERIFY:
			return Object.assign({}, state, {
				query: action?.query,
				errorMessage: '',
				isSearch: true
			});
		case AuthActionTypes.VERIFY_RESET:
			return Object.assign({}, state, {
				user: null,
				errorMessage: '',
				isSearch: false
			});
		case AuthActionTypes.VERIFY_FAILURE:
			return Object.assign({}, state, {
				user: null,
				errorMessage: 'Invalid OTP.',
				isSearch: false
			});
		case AuthActionTypes.RESET_NEW_QUERY:
			return Object.assign({}, state, {
				query: action?.query,
				isSearch: true
			});
		case AuthActionTypes.RESET_START:
			return {
				...state,
				isSearch: true
			};
		case AuthActionTypes.RESET_ENDED_SUCCESS:
			return Object.assign({}, state, {
				user: action?.payload?.data,
				errorMessage: action?.payload?.message,
				isSearch: false
			});
		case AuthActionTypes.RESET:
			return Object.assign({}, state, {
				query: action?.query,
				errorMessage: '',
				isSearch: true
			});
		case AuthActionTypes.RESET_RESET:
			return Object.assign({}, state, {
				user: null,
				errorMessage: '',
				isSearch: false
			});
		case AuthActionTypes.RESET_FAILURE:
			return Object.assign({}, state, {
				user: null,
				errorMessage: 'Opps! Something went wrong.',
				isSearch: false
			});
		case AuthActionTypes.UPDATE_PROFILE_NEW_QUERY:
			return Object.assign({}, state, {
				query: action?.query,
				isSearch: true
			});
		case AuthActionTypes.UPDATE_PROFILE_START:
			return {
				...state,
				isSearch: true
			};
		case AuthActionTypes.UPDATE_PROFILE_ENDED_SUCCESS:
			return Object.assign({}, state, {
				user: action?.payload?.data,
				errorMessage: action?.payload?.message,
				isSearch: false
			});
		case AuthActionTypes.UPDATE_PROFILE:
			return Object.assign({}, state, {
				query: action?.query,
				errorMessage: '',
				isSearch: true
			});
		case AuthActionTypes.UPDATE_PROFILE_RESET:
			return Object.assign({}, state, {
				user: null,
				errorMessage: '',
				isSearch: false
			});
		case AuthActionTypes.UPDATE_PROFILE_FAILURE:
			return Object.assign({}, state, {
				user: null,
				errorMessage: 'Opps! Something went wrong.',
				isSearch: false
			});
		default:
			return state;
	}
}
