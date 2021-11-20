import { ActionReducerMap, createSelector, MetaReducer } from '@ngrx/store';
import { environment } from '../environments/environment';
import { reducerAuth, UserLoginRegister } from './state/reducers/login-register.reducer';

export interface State {
	auth: UserLoginRegister;
}

export const reducers: ActionReducerMap<State> = {
	auth: reducerAuth
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];

const selectUser = (state: State) => state.auth;

export const user = createSelector(selectUser, (state: UserLoginRegister) => state);

