import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';
import { shareReplay, retry, catchError, map } from 'rxjs/operators';
import { chat_global } from './global';
import { ResponseChats, ResponseUsers } from './interface';

@Injectable({
	providedIn: 'root'
})
export class RootService {
	// users url's
	get_users_url = '/get/users';
	get_chats_url = '/chat/get-chat';

	// Behavior-subjects
	update_chat_view$: Subject<{ userID: string, userName: string }> = new BehaviorSubject<{ userID: string, userName: string }>({ userID: '', userName: '' });
	chat_view$ = this.update_chat_view$.asObservable();
	updatehue$: Subject<boolean> = new BehaviorSubject<boolean>(false);
	hue$ = this.updatehue$.asObservable();

	constructor(private http: HttpClient) { }

	httpOptions = {
		headers: new HttpHeaders({
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
		})
	};

	isNewSearchQuery = (query: string) => {
		if (JSON.parse(query)?.receiverUserID !== chat_global.receiverUserID) {
			chat_global.receiverUserID = JSON.parse(query)?.receiverUserID;
			this.update_chat_view$.next({ userID: JSON.parse(query)?.receiverUserID, userName: JSON.parse(query)?.receiverUserName });
			return true;
		} else {
			return false;
		}
	}
	users = (item: string): Observable<ResponseUsers> => {
		const params = new HttpParams()
			.set('userID', JSON.parse(item).userID)
			.set('searchword', JSON.parse(item).searchword)
			.set('page', JSON.parse(item).page)
			.set('pagesize', JSON.parse(item).pagesize)
			.set('sortBy', JSON.parse(item).sortBy);
		return this.http
			.post<ResponseUsers[]>(`${this.get_users_url}`, params, this.httpOptions)
			.pipe(map(r => r[0]), shareReplay(), retry(2), catchError(this.handleError));
	}
	chats = (item: string): Observable<ResponseChats> => {
		const params = new HttpParams()
			.set('userID', JSON.parse(item).userID)
			.set('searchword', JSON.parse(item).searchword)
			.set('page', JSON.parse(item).page)
			.set('pagesize', JSON.parse(item).pagesize)
			.set('receiverUserID', JSON.parse(item).receiverUserID)
			.set('sortBy', JSON.parse(item).sortBy);
		return this.http
			.post<ResponseChats[]>(`${this.get_chats_url}`, params, this.httpOptions)
			.pipe(map(r => r[0]), shareReplay(), retry(2), catchError(this.handleError));
	}
	// ErrorHandling
	handleError = (error: { error: { messages: string; }; status: any; messsage: any; }) => {
		let errorMessage = '';
		if (error.error instanceof ErrorEvent) {
			errorMessage = error.error.messages;
		} else {
			errorMessage = `Error Code : ${error.status}\nMessage : ${error.messsage}`;
		}
		return throwError(errorMessage);
	}
}
