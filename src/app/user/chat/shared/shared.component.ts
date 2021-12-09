import { AsyncPipe } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';
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
import { ReceiveChats, ResetNewChats, SearchMoreNewChats, SearchNewQueryNewChats, StartSendReceiveChats } from 'src/app/state/actions/chat.actions';
import { AddChatOnlineUsers, SearchMoreNewUsers, SearchNewQueryNewUsers } from 'src/app/state/actions/users.actions';
import { SubSink } from 'subsink';
import * as _ from 'lodash';
import { ChatService } from 'src/app/chat.service';
import { CookieService } from 'ngx-cookie-service';
import { chat_global } from 'src/app/global';

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
	],
	changeDetection: ChangeDetectionStrategy.Default
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
		this.USER$ = this.state_users() as Observable<{
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
			pagesize: 20,
			searchword: '',
			sortBy: ''
		})));
	}
	ngOnDestroy(): void {
		this.subs.unsubscribe();
		this.chat.logout();
		chat_global.receiverUserID = '0';
		this.store.dispatch(new ResetNewChats());
		this.root.update_chat_view$.next({ userID: '', userName: '' });
	}
	state_users = () => {
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
					users: r?.users.map((user: User) => {
						return {
							userID: user?.userID,
							userFirstName: user?.userFirstName,
							userLastName: user?.userLastName,
							userEmail: user?.userEmail,
							userCountryCode: user?.userCountryCode,
							userMobile: user?.userMobile,
							userStatus: user?.userStatus,
							userProfilePicture: user?.userProfilePicture,
							chats: user?.chats.map(c => {
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
							}),
						};
					})
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
	groupToArray = (chat: Chat[], date: string) => {
		return {
			date,
			data: _(chat).orderBy(d => d.time_in_ms, 'desc').reverse().map(c => {
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
			this.is_typing();

		}));
	}
	came_online = () => {
		this.chat.cameOnline().subscribe(
			userName => {
				setTimeout(() => {
					this.auth.SNACKBAR$.next({ textLabel: `${userName} came online.`, status: 'chat', timeoutMs: 5000 });
				}, 1000);
			}
		);
	}
	get_online_users = () => {
		this.subs.add(this.chat.onlineUsers().subscribe(
			(list: { userID: string }[]) => {
				this.store.dispatch(new AddChatOnlineUsers({ users: list }));
			}
		));
	}
	get_chat = () => {
		this.subs.add(this.chat.chat(this.async.transform(this.auth.user)?.userID)
			.subscribe((message: string) => {
				this.store.dispatch(new ReceiveChats({ chat: [JSON.parse(message)], selected: this.async.transform(this.root.chat_view$)?.userID }));
			}));
	}
	is_typing = () => {
		this.subs.add(this.chat.is_typing(this.async.transform(this.auth.user)?.userID)
			.subscribe((info: string) => {
				// console.log(JSON.parse(info));
			}));
	}
	keyPressing = (event: KeyboardEvent) => {
		event?.key === 'Enter' ? this.send() : this.chat.typing_message(JSON.stringify({
			toUserId: this.async.transform(this.root.chat_view$).userID,
			receiverName: this.async.transform(this.root.chat_view$).userName,
		}));
	}
	send = () => {
		if (this.messageForm.get('message').value) {
			this.store.dispatch(new StartSendReceiveChats({
				chat: [{
					fromUserId: this.async.transform(this.auth.user)?.userID,
					toUserId: this.async.transform(this.root.chat_view$).userID,
					senderName: `${this.async.transform(this.auth.user)?.userFirstName} ${this.async.transform(this.auth.user)?.userLastName}`,
					date: moment().format('YYYY-MM-DD'),
					time: moment().format('HH:mm:ss'),
					time_in_ms: new Date().getTime(),
					chatCreatedOn: new Date(),
					receiverName: this.async.transform(this.root.chat_view$).userName,
					message: this.messageForm.get('message').value.trim(),
				}], selected: this.async.transform(this.root.chat_view$).userID
			}));
			this.messageForm.get('message').patchValue('');
		}
	}
}
