import { Component, OnInit } from '@angular/core';
import { MDCSnackbar } from '@material/snackbar';
import { AuthenticationService } from './authentication.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
	constructor(private auth: AuthenticationService) {
	}
	ngOnInit(): void {
		this.auth.SHOW_SNACKBAR$.subscribe(
			(r => {
				if (r?.status) {
					const snackbar = new MDCSnackbar(document.querySelector('.mdc-snackbar'));
					snackbar.labelText = r?.textLabel;
					snackbar.timeoutMs = 4000;
					snackbar.open();
				}
			})
		);
	}
	onActivate = () => {
		window.scroll(0, 0);
	}
}
