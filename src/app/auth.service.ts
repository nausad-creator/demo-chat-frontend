import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	constructor() { }
	getLocal = (): string | null => {
		return localStorage.getItem('Monk');
	}
	getSession = (): string | null => {
		return sessionStorage.getItem('Monk');
	}
	isAuthenticated(): boolean {
		const token = this.getLocal() ? this.getLocal() : this.getSession();
		return typeof (token) === 'string' ? true : false;
	}
}
