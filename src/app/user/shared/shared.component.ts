import { AsyncPipe } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { State } from 'src/app';
import { AuthenticationService } from 'src/app/authentication.service';
import { LoadInitialNewUsers } from 'src/app/state/actions/users.actions';

@Component({
	selector: 'app-shared',
	templateUrl: './shared.component.html',
	styles: [
	]
})
export class SharedComponent implements OnInit {
	windowScrolled: boolean;
	constructor(
		private store: Store<State>,
		public auth: AuthenticationService,
		private router: Router,
		private async: AsyncPipe
	) { }
	@HostListener('window:scroll', [])
	onWindowScroll() {
		if (
			window.pageYOffset ||
			document.documentElement.scrollTop ||
			document.body.scrollTop > 100
		) {
			this.windowScrolled = true;
		} else if (
			(this.windowScrolled && window.pageYOffset) ||
			document.documentElement.scrollTop ||
			document.body.scrollTop < 10
		) {
			this.windowScrolled = false;
		}
	}
	scrollToTop() {
		(function smoothscroll() {
			const currentScroll =
				document.documentElement.scrollTop || document.body.scrollTop;
			if (currentScroll > 0) {
				window.requestAnimationFrame(smoothscroll);
				window.scrollTo(0, currentScroll - currentScroll / 8);
			}
		})();
	}
	ngOnInit(): void {
		this.store.dispatch(new LoadInitialNewUsers(JSON.stringify({
			userID: this.async.transform(this.auth.user)?.userID,
			searchword: '',
			pagesize: '20',
			page: '1',
			sortBy: ''
		})));
	}
	logout = () => {
		this.router.navigate(['/']);
	}
}
