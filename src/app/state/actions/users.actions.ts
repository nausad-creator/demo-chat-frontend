import { Action } from '@ngrx/store';
import { Chat, Users } from 'src/app/interface';

export enum UsersActionTypes {
	// for NEW Users
	ADD_NEW_USERS = '[Users] ADD_NEW_USERS',
	ADD_NEW_MORE_USERS = '[Users] ADD_NEW_MORE_USERS',
	ADD_CHAT_USERS = '[Users] ADD_CHAT_USERS',
	ADD_CHAT_ONLINE_USERS = '[Users] ADD_CHAT_ONLINE_USERS',
	LOAD_INITIAL_NEW_USERS = '[Users] LOAD_INITIAL_NEW_USERS',
	LOAD_FAILURE_NEW_USERS = '[Users] LOAD_FAILURE_NEW_USERS',
	RESET_NEW_USERS = '[Users] RESET_NEW_USERS',
	SEARCH_NEW_QUERY_NEW_USERS = '[Users] SEARCH_NEW_QUERY_NEW_USERS',
	SEARCH_ENDED_SUCCESS_NEW_USERS = '[Users] SEARCH_ENDED_SUCCESS_NEW_USERS',
	SEARCH_ENDED_SUCCESS_MORE_NEW_USERS = '[Users] SEARCH_ENDED_SUCCESS_MORE_NEW_USERS',
	SEARCH_START_NEW_USERS = '[Users] SEARCH_START_NEW_USERS',
	SEARCH_START_NEW_MORE_USERS = '[Users] SEARCH_START_NEW_MORE_USERS',
	SEARCH_MORE_NEW_USERS = '[Users] SEARCH_MORE_NEW_USERS',
	RESET_USERS_UNREAD_CHAT = '[Users] RESET_USERS_UNREAD_CHAT',
	START_RESET_USERS_UNREAD_CHAT = '[Users] START_RESET_USERS_UNREAD_CHAT',
	SUCCESS_RESET_USERS_UNREAD_CHAT = '[Users] SUCCESS_RESET_USERS_UNREAD_CHAT',
	FAILURE_UNREAD_CHAT = '[Users] FAILURE_UNREAD_CHAT',
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
export class SendReceiveChatUser implements Action {
	readonly type = UsersActionTypes.ADD_CHAT_USERS;
	constructor(public payload: {
		selectedID: string;
		chat: Chat[];
	}) { }
}
export class AddChatOnlineUsers implements Action {
	readonly type = UsersActionTypes.ADD_CHAT_ONLINE_USERS;
	constructor(public payload: {
		users: { userID: string }[]
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
export class ResetUsersUnreadChat implements Action {
	readonly type = UsersActionTypes.RESET_USERS_UNREAD_CHAT;
	constructor(public query?: string) { }
}
export class StartResetUsersUnreadChat implements Action {
	readonly type = UsersActionTypes.START_RESET_USERS_UNREAD_CHAT;
	constructor(public query: string) { }
}
export class SuccessResetUsersUnreadChat implements Action {
	readonly type = UsersActionTypes.SUCCESS_RESET_USERS_UNREAD_CHAT;
	constructor(public success: {
		query: string;
		code: number;
		message?: string;
	}) { }
}
export class FailureUnreadChat implements Action {
	readonly type = UsersActionTypes.FAILURE_UNREAD_CHAT;
	constructor(public err?: {
		message: string;
		status: string;
	}) { }
}

export type UsersActions =
	| AddNewUsers
	| AddNewMoreUsers
	| SendReceiveChatUser
	| AddChatOnlineUsers
	| LoadInitialNewUsers
	| SearchStartNewUsers
	| SearchStartNewMoreUsers
	| SearchEndedSuccessNewUsers
	| SearchEndedSuccessMoreNewUsers
	| SearchNewQueryNewUsers
	| SearchMoreNewUsers
	| FailureNewUsers
	| ResetUsersUnreadChat
	| StartResetUsersUnreadChat
	| SuccessResetUsersUnreadChat
	| FailureUnreadChat
	| ResetNewUsers;
