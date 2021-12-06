import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, take, tap, withLatestFrom } from 'rxjs/operators';
import { State } from 'src/app';
import { RootService } from 'src/app/root.service';
import { AddNewUsers, AddNewMoreUsers, LoadInitialNewUsers, SearchStartNewUsers, SearchStartNewMoreUsers, SearchEndedSuccessNewUsers, SearchEndedSuccessMoreNewUsers, SearchNewQueryNewUsers, SearchMoreNewUsers, FailureNewUsers, ResetNewUsers, UsersActionTypes } from '../actions/users.actions';

@Injectable()
export class UsersEffects {
	INITIAL_USERS$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(UsersActionTypes.LOAD_INITIAL_NEW_USERS),
			tap((r) => new ResetNewUsers(r.query)),
			map((a) => new SearchStartNewUsers(a.query)));
	});
	UPDATES_USERS$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(UsersActionTypes.SEARCH_NEW_QUERY_NEW_USERS),
			tap((r) => new ResetNewUsers(r.query)),
			map((a) => new SearchStartNewUsers(a.query)));
	});
	MORE_USERS$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(UsersActionTypes.SEARCH_MORE_NEW_USERS),
			tap((r) => new ResetNewUsers(r.query)),
			map((a) => new SearchStartNewMoreUsers(a.query)));
	});
	FETCH_USERS$ = createEffect((): Observable<SearchEndedSuccessNewUsers> => {
		return this.actions$.pipe(
			ofType(UsersActionTypes.SEARCH_START_NEW_USERS),
			withLatestFrom(this.store.select(state => state.users.users)),
			switchMap(action => this.root.users(action[0].query).pipe(
				map(data => new SearchEndedSuccessNewUsers(data?.status === 'true' ? {
					data: data?.data,
					message: data?.message,
					status: data?.status
				} : {
					data: [{
						results: [],
						page: 0,
						limit: 0,
						totalPages: 0,
						totalResults: 0
					}],
					message: 'No Data Found',
					status: 'false'
				}),
					catchError(() => of(new FailureNewUsers({
						data: [{
							results: [],
							page: 0,
							limit: 0,
							totalPages: 0,
							totalResults: 0
						}],
						message: 'No Data Found',
						status: 'false'
					})))
				), take(1))
			)
		);
	});
	FETCH_MORE_USERS$ = createEffect((): Observable<SearchEndedSuccessMoreNewUsers> => {
		return this.actions$.pipe(
			ofType(UsersActionTypes.SEARCH_START_NEW_MORE_USERS),
			withLatestFrom(this.store.select(state => state.users.users)),
			switchMap(action => this.root.users(action[0].query).pipe(
				map(data => new SearchEndedSuccessMoreNewUsers(data?.status === 'true' ? {
					data: data?.data,
					message: data?.message,
					status: data?.status
				} : {
					data: [{
						results: [],
						page: 0,
						limit: 0,
						totalPages: 0,
						totalResults: 0
					}],
					message: 'No Data Found',
					status: 'false'
				}),
					catchError(() => of(new FailureNewUsers({
						data: [{
							results: [],
							page: 0,
							limit: 0,
							totalPages: 0,
							totalResults: 0
						}],
						message: 'No Data Found',
						status: 'false'
					})))
				), take(1))
			)
		);
	});
	SUCCESS_USERS$ = createEffect(() => {
		return this.actions$.pipe(ofType(UsersActionTypes.SEARCH_ENDED_SUCCESS_NEW_USERS),
			map((a) => new AddNewUsers(a.payload))
		);
	});
	SUCCESS_MORE_USERS$ = createEffect(() => {
		return this.actions$.pipe(ofType(UsersActionTypes.SEARCH_ENDED_SUCCESS_MORE_NEW_USERS),
			map((a) => new AddNewMoreUsers(a.payload))
		);
	});
	constructor(
		private actions$: Actions<
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
			| ResetNewUsers>,
		private root: RootService,
		private store: Store<State>) { }

}
