import { DOCUMENT } from '@angular/common';
import { Component, HostListener, Inject, OnInit } from '@angular/core';

@Component({
	selector: 'app-cms',
	template: `
  <!--  Header  -->
  <header id="header" class="fixed-top">
    <div class="container d-flex align-items-center">
       <a routerLink="/" class="logo mr-auto"><img src="assets/images/logo.png" alt="" class="img-fluid"></a>
      <nav class="nav-menu d-none d-lg-block">
        <ul class="align-items-center">
          <li><a routerLink="about-us">About Us</a></li>
          <li><a routerLink="contact-us">Contact Us</a></li>
          <li><a routerLink="faqs">FAQ</a></li>
        </ul>
      </nav><!-- .nav-menu -->
      <a href="#" class="get-started-btn ml-3">Login</a>
    </div>
  </header><!-- End Header -->
  <router-outlet (activate)="onActivate()"></router-outlet>
  <!-- Footer -->
  <footer id="footer" class="position-relative">
    <div class="container d-md-flex py-4">
		<div class="mr-md-auto text-center text-md-left">
			<div class="copyright">&copy; 2020 the english monk, All Rights reserved.</div>
        </div>
	    <div class="footermenu">
			<a routerLink="privacy-policy">Privacy Policy</a>
			<a routerLink="terms-and-conditions">Terms & Conditions</a>
		</div>
    </div>
  </footer>
  <!-- End Footer -->
  <a (click)="scrollToTop()" class="back-to-top"><i class="fa fa-angle-up"></i></a>
  `,
	styles: [
	]
})
export class CmsComponent implements OnInit {

	windowScrolled: boolean;
	constructor(@Inject(DOCUMENT) private document: Document) { }
	@HostListener('window:scroll', [])
	// tslint:disable-next-line: typedef
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
	// tslint:disable-next-line:typedef
	scrollToTop() {
		// tslint:disable-next-line: typedef
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
	onActivate = () => {
		window.scroll(0, 0);
	}
}
