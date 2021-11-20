import { Component, HostListener, OnInit } from '@angular/core';

@Component({
	selector: 'app-shared',
	templateUrl: './shared.component.html',
	styles: [
	]
})
export class SharedComponent implements OnInit {
	windowScrolled: boolean;
	constructor() { }
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
	}
}
