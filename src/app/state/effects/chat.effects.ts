import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, filter, map, switchMap, take, tap, withLatestFrom } from 'rxjs/operators';
import { State } from 'src/app';
import { ChatService } from 'src/app/chat.service';
import { RootService } from 'src/app/root.service';
import { AddNewChats, AddNewMoreChats, LoadInitialNewChats, SearchStartNewChats, SearchStartNewMoreChats, SearchEndedSuccessNewChats, SearchEndedSuccessMoreNewChats, SearchNewQueryNewChats, SearchMoreNewChats, FailureNewChats, ResetNewChats, ChatsActionTypes, StartSendReceiveChats, SendChats } from '../actions/chat.actions';

@Injectable()
export class ChatsEffects {
	INITIAL_CHATS$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(ChatsActionTypes.LOAD_INITIAL_NEW_CHATS),
			tap((r) => new ResetNewChats(r.query)),
			map((a) => new SearchStartNewChats(a.query)));
	});
	UPDATES_CHATS$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(ChatsActionTypes.SEARCH_NEW_QUERY_NEW_CHATS),
			filter((action) => this.root.isNewSearchQuery(action.query)),
			tap((r) => new ResetNewChats(r.query)),
			map((a) => new SearchStartNewChats(a.query)));
	});
	ADD_SEND_RECEIVE_CHATS$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(ChatsActionTypes.START_SEND_AND_RECEIVE_CHATS),
			map(p => new SendChats({ chat: p.payload.chat })),
		);
	});
	SEND$ = createEffect(() => {
		return this.actions$.pipe(ofType(ChatsActionTypes.SEND_CHATS),
			map((a) => {
				this.chat.send_message(JSON.stringify(a.payload.chat[0]));
			})
		);
	},
		{
			dispatch: false
		});
	MORE_CHATS$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(ChatsActionTypes.SEARCH_MORE_NEW_CHATS),
			tap((r) => new ResetNewChats(r.query)),
			map((a) => new SearchStartNewMoreChats(a.query)));
	});
	FETCH_CHATS$ = createEffect((): Observable<SearchEndedSuccessNewChats> => {
		return this.actions$.pipe(
			ofType(ChatsActionTypes.SEARCH_START_NEW_CHATS),
			withLatestFrom(this.store.select(state => state.chats.chats)),
			switchMap(action => this.root.chats(action[0].query).pipe(
				map(data => new SearchEndedSuccessNewChats(data?.status === 'true' ? {
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
					catchError(() => of(new FailureNewChats({
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
	FETCH_MORE_CHATS$ = createEffect((): Observable<SearchEndedSuccessMoreNewChats> => {
		return this.actions$.pipe(
			ofType(ChatsActionTypes.SEARCH_START_NEW_MORE_CHATS),
			withLatestFrom(this.store.select(state => state.chats.chats)),
			switchMap(action => this.root.chats(action[0].query).pipe(
				map(data => new SearchEndedSuccessMoreNewChats(data?.status === 'true' ? {
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
					catchError(() => of(new FailureNewChats({
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
	SUCCESS_CHATS$ = createEffect(() => {
		return this.actions$.pipe(ofType(ChatsActionTypes.SEARCH_ENDED_SUCCESS_NEW_CHATS),
			map((a) => new AddNewChats(a.payload))
		);
	});
	SUCCESS_MORE_CHATS$ = createEffect(() => {
		return this.actions$.pipe(ofType(ChatsActionTypes.SEARCH_ENDED_SUCCESS_MORE_NEW_CHATS),
			map((a) => new AddNewMoreChats(a.payload))
		);
	});
	constructor(
		private actions$: Actions<
			| AddNewChats
			| AddNewMoreChats
			| SendChats
			| LoadInitialNewChats
			| SearchStartNewChats
			| StartSendReceiveChats
			| SearchStartNewMoreChats
			| SearchEndedSuccessNewChats
			| SearchEndedSuccessMoreNewChats
			| SearchNewQueryNewChats
			| SearchMoreNewChats
			| FailureNewChats
			| ResetNewChats>,
		private root: RootService,
		private chat: ChatService,
		private store: Store<State>) { }

}
