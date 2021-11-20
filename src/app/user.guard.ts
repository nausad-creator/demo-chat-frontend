import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable({
	providedIn: 'root'
})
export class UserGuard implements CanActivate {
	constructor(readonly router: Router, private service: AuthenticationService) { }
	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): Observable<boolean | UrlTree> | boolean | UrlTree {
		const currentUser = this.service.is_authenticated();
		if (currentUser) {
			return true;
		} else {
			return this.router.createUrlTree(['/']);
		}
	}
}
