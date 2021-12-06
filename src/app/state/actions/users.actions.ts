import { Action } from '@ngrx/store';
import { Users } from 'src/app/interface';

export enum UsersActionTypes {
	// for NEW Users
	ADD_NEW_USERS = '[Users] ADD_NEW_USERS',
	ADD_NEW_MORE_USERS = '[Users] ADD_NEW_MORE_USERS',
	LOAD_INITIAL_NEW_USERS = '[Users] LOAD_INITIAL_NEW_USERS',
	LOAD_FAILURE_NEW_USERS = '[Users] LOAD_FAILURE_NEW_USERS',
	RESET_NEW_USERS = '[Users] RESET_NEW_USERS',
	SEARCH_NEW_QUERY_NEW_USERS = '[Users] SEARCH_NEW_QUERY_NEW_USERS',
	SEARCH_ENDED_SUCCESS_NEW_USERS = '[Users] SEARCH_ENDED_SUCCESS_NEW_USERS',
	SEARCH_ENDED_SUCCESS_MORE_NEW_USERS = '[Users] SEARCH_ENDED_SUCCESS_MORE_NEW_USERS',
	SEARCH_START_NEW_USERS = '[Users] SEARCH_START_NEW_USERS',
	SEARCH_START_NEW_MORE_USERS = '[Users] SEARCH_START_NEW_MORE_USERS',
	SEARCH_MORE_NEW_USERS = '[Users] SEARCH_MORE_NEW_USERS',
}

// NEW ACTIONS
export class AddNewUsers implements Action {
	readonly type = UsersActionTypes.ADD_NEW_USERS;
	constructor(public payload: {
		data: Users[];
		message: string;
		status: string;
	}) { }
}
export class AddNewMoreUsers implements Action {
	readonly type = UsersActionTypes.ADD_NEW_MORE_USERS;
	constructor(public payload: {
		data: Users[];
		message: string;
		status: string;
	}) { }
}
export class SearchStartNewUsers implements Action {
	readonly type = UsersActionTypes.SEARCH_START_NEW_USERS;
	constructor(public query: string) { }
}
export class SearchStartNewMoreUsers implements Action {
	readonly type = UsersActionTypes.SEARCH_START_NEW_MORE_USERS;
	constructor(public query: string) { }
}
export class LoadInitialNewUsers implements Action {
	readonly type = UsersActionTypes.LOAD_INITIAL_NEW_USERS;
	constructor(public query: string) { }
}
export class SearchEndedSuccessNewUsers implements Action {
	readonly type = UsersActionTypes.SEARCH_ENDED_SUCCESS_NEW_USERS;
	constructor(public payload: {
		data: Users[];
		message: string;
		status: string;
	}) { }
}
export class SearchEndedSuccessMoreNewUsers implements Action {
	readonly type = UsersActionTypes.SEARCH_ENDED_SUCCESS_MORE_NEW_USERS;
	constructor(public payload: {
		data: Users[];
		message: string;
		status: string;
	}) { }
}
export class SearchNewQueryNewUsers implements Action {
	readonly type = UsersActionTypes.SEARCH_NEW_QUERY_NEW_USERS;
	constructor(public query: string) { }
}
export class SearchMoreNewUsers implements Action {
	readonly type = UsersActionTypes.SEARCH_MORE_NEW_USERS;
	constructor(public query: string) { }
}
export class FailureNewUsers implements Action {
	readonly type = UsersActionTypes.LOAD_FAILURE_NEW_USERS;
	constructor(public err: {
		data: Users[];
		message: string;
		status: string;
	}) { }
}
export class ResetNewUsers implements Action {
	readonly type = UsersActionTypes.RESET_NEW_USERS;
	constructor(public query?: string) { }
}

export type UsersActions =
	| AddNewUsers
	| AddNewMoreUsers
	| LoadInitialNewUsers
	| SearchStartNewUsers
	| SearchStartNewMoreUsers
	| SearchEndedSuccessNewUsers
	| SearchEndedSuccessMoreNewUsers
	| SearchNewQueryNewUsers
	| SearchMoreNewUsers
	| FailureNewUsers
	| ResetNewUsers;
