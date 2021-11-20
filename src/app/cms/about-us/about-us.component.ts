import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RootService } from 'src/app/root.service';
interface About {
	cmspageName: string;
	cmspageContents: string;
}
@Component({
	selector: 'app-about-us',
	template: `
  <main id="main" style="overflow:hidden;position:relative;">
	<div class="header-shape">
		<img src="assets/images/header_shap.png">
	</div>
	<div class="sapretor"></div>
    <section class="dshbord-section pt-3 pb-3">
      <div class="container">
		<div class="card mb-3">
			<div class="p-3">
				<h4 class="mb-0 text-dark page-title-main">About Us</h4>
			</div>
			<hr class="m-0">
			<div class="card-body">
				<div class="row align-items-center" *ngIf="about$ | async as content">
					<div class="col-lg-6 col-md-6 pb-3">
						<div class="about-content">
							<div [innerHTML]="content.cmspageContents | safeHtml"></div>
						</div>
					</div>
					<div class="col-lg-6 col-md-6 pb-3">
						<div class="about-img">
							<img src="assets/images/login-img.png" alt="about MasterG">
						</div>
					</div>
				</div>
				<div class="container" *ngIf="(about$ | async) === null">
                        <div class="row" style="margin-top: 40px; height: 500px;">
                          <div class="col">
                            <p class="text-center">Loading...</p>
                          </div>
                        </div>
                      </div>
                     <div class="container" *ngIf="(about$ | async) === undefined">
                        <div class="row" style="margin-top: 40px; height: 500px;">
                           <div class="col">
                             <p class="text-center">No Content Found.</p>
                        </div>
                    </div>
                </div>
			</div>
		</div>
      </div>
    </section>
  </main>
  `,
	styles: [
	]
})
export class AboutUsComponent implements OnInit {
	about$: Observable<About>;
	constructor(private rootservice: RootService) { }
	ngOnInit(): void {
		this.about$ = this.rootservice.about.pipe(map(res => res[0].data[0])) as unknown as Observable<About>;
	}
}
