import { AsyncPipe } from '@angular/common';
import { AfterViewInit, Component, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as moment from 'moment';
import { NgScrollbar } from 'ngx-scrollbar';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { catchError, debounceTime, delay, distinctUntilChanged, map, mergeMap, tap } from 'rxjs/operators';
import { chats, State, users } from 'src/app';
import { AuthenticationService } from 'src/app/authentication.service';
import { Chat, DataTypeUsers, User } from 'src/app/interface';
import { RootService } from 'src/app/root.service';
import { ReceiveChats, SearchMoreNewChats, SearchNewQueryNewChats, StartSendReceiveChats } from 'src/app/state/actions/chat.actions';
import { SearchMoreNewUsers, SearchNewQueryNewUsers } from 'src/app/state/actions/users.actions';
import { SubSink } from 'subsink';
import * as _ from 'lodash';
import { ChatService } from 'src/app/chat.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
	selector: 'app-shared',
	templateUrl: './shared.component.html',
	styles: [
		`.my-scrollbar {
			--scrollbar-hover-size: 8px;
			--scrollbar-thumb-hover-color: grey;;
			--scrollbar-padding: 0px;
			--scrollbar-overscroll-behavior: initial;
			--scrollbar-transition-duration: 400ms;
			--scrollbar-transition-delay: 800ms;
			--scrollbar-margin:0;
			--scrollbar-thumb-transition: height ease-out 150ms,width ease-out 150ms;
			box-sizing: inherit!important;
		}`
	]
})
export class SharedComponent implements OnInit, AfterViewInit, OnDestroy {
	USER$: Observable<{
		users: User[];
		page: number;
		limit: number;
		totalPages: number;
		totalResults: number;
		message: string;
		status: string;
		query: string;
		isSearch: boolean;
	}>;
	CHAT$: Observable<{
		chats: Chat[];
		page: number;
		limit: number;
		totalPages: number;
		totalResults: number;
		message: string;
		status: string;
		query: string;
		isSearch: boolean;
		isSearchMore: boolean;
	}>;
	size_user$: Subject<{
		page: number;
		limit: number;
		totalPages: number;
		totalResults: number;
		query: string
	}> = new BehaviorSubject<{
		page: number;
		limit: number;
		totalPages: number;
		totalResults: number;
		query: string
	}>({ page: 1, totalPages: 0, totalResults: 0, limit: 10, query: '' });
	size_chat$: Subject<{
		page: number;
		limit: number;
		totalPages: number;
		totalResults: number;
		query: string
	}> = new BehaviorSubject<{
		page: number;
		limit: number;
		totalPages: number;
		totalResults: number;
		query: string
	}>({ page: 1, totalPages: 0, totalResults: 0, limit: 10, query: '' });
	subs = new SubSink();
	users_online: Observable<{ userID: string }[]>;
	searchForm: FormGroup;
	messageForm: FormGroup;
	@ViewChild('scrollable', { static: true }) scrollbarRef: NgScrollbar;
	constructor(
		public auth: AuthenticationService,
		public root: RootService,
		private async: AsyncPipe,
		readonly router: Router,
		private store: Store<State>,
		private ngZone: NgZone,
		private chat: ChatService,
		private cookie: CookieService,
		private fb: FormBuilder) {
		// global search form
		this.setupFormSearch();
		this.setupFormMessage();
	}
	setupFormSearch = () => {
		this.searchForm = this.fb.group({ preset: '' });
		this.searchForm.valueChanges.pipe(map((event) => event), debounceTime(500), distinctUntilChanged(),
			mergeMap((search) => of(search).pipe(delay(100)))).subscribe((input: { preset: string }) => {
				const temp = JSON.parse(this.async.transform(this.size_user$).query) as DataTypeUsers;
				temp.page = '1';
				temp.searchword = input.preset;
				this.store.dispatch(new SearchNewQueryNewUsers(JSON.stringify(temp)));
			});
	}
	setupFormMessage = () => {
		this.messageForm = this.fb.group({ message: '' });
	}

	more_chats = (s: { pos: number, max: number }) => {
		if (this.async.transform(this.size_chat$).page !== this.async.transform(this.size_chat$).totalPages) {
			const temp = JSON.parse(this.async.transform(this.size_chat$).query) as DataTypeUsers;
			temp.page = (+temp.page + 1).toString();
			temp.pagesize = temp.pagesize;
			this.store.dispatch(new SearchMoreNewChats(JSON.stringify(temp)));
		}
	}

	ngAfterViewInit() {
		this.subs.add(this.scrollbarRef.scrolled.pipe(
			map((e: any) => {
				return {
					pos: e.target.scrollTop + e.target.clientHeight,
					max: e.target.scrollHeight
				};
			})
		).subscribe(s => {
			if (s.pos >= s.max && (this.async.transform(this.size_user$).page !== this.async.transform(this.size_user$).totalPages)) {
				const temp = JSON.parse(this.async.transform(this.size_user$).query) as DataTypeUsers;
				temp.page = (+temp.page + 1).toString();
				temp.pagesize = temp.pagesize;
				this.store.dispatch(new SearchMoreNewUsers(JSON.stringify(temp)));
			}
		}));
	}

	ngOnInit(): void {
		this.verify_to_socket();
		this.USER$ = this.state() as Observable<{
			users: User[];
			page: number;
			limit: number;
			totalPages: number;
			totalResults: number;
			message: string;
			status: string;
			query: string;
			isSearch: boolean;
		}>;
		this.CHAT$ = this.state_chat() as Observable<{
			chats: Chat[];
			page: number;
			limit: number;
			totalPages: number;
			totalResults: number;
			message: string;
			status: string;
			query: string;
			isSearch: boolean;
			isSearchMore: boolean;
		}>;
	}
	open_or_change = ($event?: { userID: string, userName: string }) => {
		this.store.dispatch(new SearchNewQueryNewChats(JSON.stringify({
			userID: this.async.transform(this.auth.user)?.userID,
			receiverUserID: $event?.userID,
			receiverUserName: $event?.userName,
			page: 1,
			pagesize: 10,
			searchword: '',
			sortBy: ''
		})));
	}
	ngOnDestroy(): void {
		this.subs.unsubscribe();
		this.chat.logout();
	}
	state = () => {
		return this.store.select(users).pipe(
			map((r) => {
				return {
					query: r?.query,
					isSearch: r?.isSearch,
					status: r?.status,
					message: r?.message,
					page: r?.page,
					limit: r?.limit,
					totalPages: r?.totalPages,
					totalResults: r?.totalResults,
					users: r?.users.map((user: User) => user)
				};
			}),
			tap((size) => this.ngZone.run(() => this.size_user$.next(
				{
					totalPages: size?.totalPages,
					totalResults: size?.totalResults,
					page: size?.page,
					limit: size?.limit,
					query: size?.query
				}
			))),
			catchError(() => of({
				data: [],
				itemscount: '0',
				message: 'No Data Found',
				status: 'false'
			}))) as Observable<{
				users: User[];
				page: number;
				limit: number;
				totalPages: number;
				totalResults: number;
				message: string;
				status: string;
				query: string;
				isSearch: boolean;
			}>;
	}
	state_chat = () => {
		return this.store.select(chats).pipe(
			map((r) => {
				return {
					query: r?.query,
					isSearch: r?.isSearch,
					isSearchMore: r?.isSearchMore,
					status: r?.status,
					message: r?.message,
					page: r?.page,
					limit: r?.limit,
					totalPages: r?.totalPages,
					totalResults: r?.totalResults,
					chats: r?.chats.map((chat: Chat) => chat),
					grouped: _(r?.chats).groupBy(d => d.date).map(this.groupToArray).reverse().sortBy(d => d.date).value()
				};
			}),
			tap((size) => this.ngZone.run(() => this.size_chat$.next(
				{
					totalPages: size?.totalPages,
					totalResults: size?.totalResults,
					page: size?.page,
					limit: size?.limit,
					query: size?.query
				}
			))),
			catchError(() => of({
				data: [],
				itemscount: '0',
				message: 'No Data Found',
				status: 'false'
			}))) as Observable<{
				chats: Chat[];
				page: number;
				limit: number;
				totalPages: number;
				totalResults: number;
				message: string;
				status: string;
				query: string;
				isSearch: boolean;
				isSearchMore: boolean;
			}>;
	}
	groupToArray = (group: Chat[], date: string) => {
		return {
			date,
			data: _(group).orderBy(d => d.time, 'desc').reverse().map(c => {
				return {
					chatID: c?.chatID,
					fromUserId: c?.fromUserId,
					toUserId: c?.toUserId,
					senderName: c?.senderName,
					date: c?.date,
					time: moment(new Date(`${c?.date} ${c?.time}`)).format('hh:mm a'),
					receiverName: c?.receiverName,
					isRead: c?.isRead,
					message: c?.message
				};
			}).value()
		};
	}
	verify_to_socket = () => {
		this.chat.check_connection();
		this.subs.add(this.chat.verify().subscribe(() => {
			this.chat.setUser(this.cookie.get('auth'));
			this.came_online();
			this.get_online_users();
			this.get_chat();
		}));
	}
	came_online = () => {
		this.chat.cameOnline().subscribe(
			userName => {
				setTimeout(() => {
					this.auth.SNACKBAR$.next({ textLabel: `${userName} came online.`, status: 'chat', timeoutMs: 5000 });
				}, 2000);
			}
		);
	}
	get_online_users = () => {
		this.users_online = this.chat.onlineUsers() as Observable<{ userID: string }[]>;
	}
	get_chat = () => {
		this.subs.add(this.chat.chat(this.async.transform(this.auth.user)?.userID)
			.subscribe((message: string) => {
				this.store.dispatch(new ReceiveChats({ chat: [JSON.parse(message)] }));
			}));
	}
	send = () => {
		if (this.messageForm.get('message').value) {
			this.store.dispatch(new StartSendReceiveChats({
				chat: [{
					chatID: '0',
					fromUserId: this.async.transform(this.auth.user)?.userID,
					toUserId: this.async.transform(this.root.chat_view$).userID,
					senderName: `${this.async.transform(this.auth.user)?.userFirstName} ${this.async.transform(this.auth.user)?.userLastName}`,
					date: moment().format('YYYY-MM-DD'),
					time: moment().format('HH:mm:ss'),
					chatCreatedOn: new Date(),
					receiverName: this.async.transform(this.root.chat_view$).userName,
					isRead: true,
					message: this.messageForm.get('message').value.trim(),
					apiType: 'web',
					apiVersion: '/api/v1',
					createdAt: new Date(),
					id: '0',
				}],
			}));
			this.messageForm.get('message').patchValue('');
		}
	}
}
