import { ActionReducerMap, createSelector, MetaReducer } from '@ngrx/store';
import { environment } from '../environments/environment';
import { ChatsList, ReducerChats } from './state/reducers/chat.reducer';
import { reducerAuth, UserLoginRegister } from './state/reducers/login-register.reducer';
import { ReducerUsers, UsersList } from './state/reducers/users.reducer';

export interface State {
	auth: UserLoginRegister;
	users: UsersList;
	chats: ChatsList;
}

export const reducers: ActionReducerMap<State> = {
	auth: reducerAuth,
	users: ReducerUsers,
	chats: ReducerChats
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];

const selectUser = (state: State) => state.auth;
const selectUsers = (state: State) => state.users;
const selectChats = (state: State) => state.chats;

export const user = createSelector(selectUser, (state: UserLoginRegister) => state);
export const users = createSelector(selectUsers, (state: UsersList) => state);
export const chats = createSelector(selectChats, (state: ChatsList) => state);

