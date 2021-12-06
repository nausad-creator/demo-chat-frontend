import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable({
	providedIn: 'root'
})
export class NotUserGuard implements CanActivate {
	constructor(private service: AuthenticationService, readonly router: Router) { }
	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): Observable<boolean | UrlTree> | boolean | UrlTree {
		const currentUser = this.service.is_authenticated();
		if (!currentUser) {
			return true;
		} else {
			return this.router.createUrlTree(['/user']);
		}
	}
}
