import { Chat, User } from 'src/app/interface';
import { UsersActions, UsersActionTypes } from '../actions/users.actions';

export interface UsersList {
	users: User[];
	page: number;
	limit: number;
	totalPages: number;
	totalResults: number;
	message: string;
	status: string;
	query: string;
	isSearch: boolean;
}
export const initial_users: UsersList = {
	users: [],
	page: 0,
	limit: 0,
	totalPages: 0,
	totalResults: 0,
	message: 'initial_load',
	status: 'initial',
	query: '',
	isSearch: false
};
function update_chats(users: User[], chat: Chat[], selectedID?: string) {
	const temp = users.map((item) =>
		Object.assign({}, item, {
			chats: item.userID === selectedID ? chat : item.chats
		})
	);
	return temp;
}
function update_online_user(users: User[], list: { userID: string }[]) {
	const temp = users.map((item) =>
		Object.assign({}, item, {
			userStatus: item.userID === list.filter(o => o.userID === item.userID)[0]?.userID ? 'Online' : 'Offline'
		})
	);
	return temp;
}
export function ReducerUsers(state = initial_users, action: UsersActions): UsersList {
	switch (action?.type) {
		case UsersActionTypes.ADD_NEW_USERS:
			return Object.assign({}, state, {
				users: action?.payload?.data[0]?.results,
				page: action?.payload?.data[0]?.page,
				limit: action?.payload?.data[0]?.limit,
				totalPages: action?.payload?.data[0]?.totalPages,
				totalResults: action?.payload?.data[0]?.totalResults,
				message: action?.payload?.message,
				status: action?.payload?.status
			});
		case UsersActionTypes.ADD_NEW_MORE_USERS:
			return Object.assign({}, state, {
				users: [...state.users, ...action?.payload?.data[0]?.results],
				page: action?.payload?.data[0]?.page,
				limit: action?.payload?.data[0]?.limit,
				totalPages: action?.payload?.data[0]?.totalPages,
				totalResults: action?.payload?.data[0]?.totalResults,
				message: action?.payload?.message,
				status: action?.payload?.status
			});
		case UsersActionTypes.ADD_CHAT_USERS:
			return Object.assign({}, state, {
				users: update_chats(state.users, action?.payload?.chat, action?.payload?.selectedID)
			});
		case UsersActionTypes.ADD_CHAT_ONLINE_USERS:
			return Object.assign({}, state, {
				users: update_online_user(state.users, action?.payload?.users)
			});
		case UsersActionTypes.SEARCH_NEW_QUERY_NEW_USERS:
			return Object.assign({}, state, {
				query: action?.query
			});
		case UsersActionTypes.SEARCH_MORE_NEW_USERS:
			return Object.assign({}, state, {
				query: action?.query
			});
		case UsersActionTypes.SEARCH_START_NEW_USERS:
			return {
				...state,
				isSearch: true
			};
		case UsersActionTypes.SEARCH_START_NEW_MORE_USERS:
			return {
				...state,
				isSearch: true
			};
		case UsersActionTypes.SEARCH_ENDED_SUCCESS_NEW_USERS:
			return {
				...state,
				isSearch: false
			};
		case UsersActionTypes.SEARCH_ENDED_SUCCESS_MORE_NEW_USERS:
			return {
				...state,
				isSearch: false
			};
		case UsersActionTypes.LOAD_INITIAL_NEW_USERS:
			return Object.assign({}, state, {
				query: action?.query,
				isSearch: true
			});
		case UsersActionTypes.RESET_NEW_USERS:
			return Object.assign({}, state, {
				users: [],
				page: 0,
				limit: 0,
				totalPages: 0,
				totalResults: 0,
				message: 'initial_load',
				status: 'initial',
				isSearch: false
			});
		case UsersActionTypes.LOAD_FAILURE_NEW_USERS:
			return Object.assign({}, state, {
				users: [],
				page: 0,
				limit: 0,
				totalPages: 0,
				totalResults: 0,
				message: 'fail_state',
				status: 'fail',
				isSearch: false
			});
		default:
			return state;
	}
}
