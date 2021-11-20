import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RootService } from 'src/app/root.service';
interface Faqs {
	faqAnswer: string;
	faqID: string;
	faqQuestion: string;
	faqtypeName: string;
}
@Component({
	selector: 'app-faqs',
	template: `
  <main id="main" style="overflow:hidden;position:relative;">
	<!--<div class="header-shape">
		<img src="assets/images/header_shap.png">
	</div>	-->
	<div class="sapretor"></div>
    <section class="dshbord-section pt-3 pb-3">
      <div class="container">
		<div class="card mb-3">
			<div class="p-3">
				<h4 class="mb-0 text-dark page-title-main">Frequently Asked Questions</h4>
			</div>
			<hr class="m-0">
			<div class="card-body">
				<div class="faq-section">
					<!--Accordion wrapper-->

					<div class="accordion md-accordion" id="accordionEx" role="tablist" aria-multiselectable="true" *ngIf="faq$ | async as content">
					  <!-- Accordion card -->
					  <div class="card" *ngFor="let item of content; index as i">
						<div class="card-header" role="tab" id="headingOne1">
						  <a data-toggle="collapse" data-parent="#accordionEx" [attr.data-target]="'#test' + i" aria-expanded="true">
							<h5 class="mb-0 font-weight-normal">{{item.faqQuestion}} <i class="fa fa-angle-down rotate-icon float-right"></i></h5>
						  </a>
						</div>
						<div id="test{{i}}" class="collapse" role="tabpanel" data-parent="#accordionEx">
						  <div class="card-body" [innerHTML]="item.faqAnswer | safeHtml"></div>
						</div>
					  </div>
					  <!-- Accordion card -->
					</div>
					<div class="container" *ngIf="(faq$ | async) === null">
                        <div class="row" style="margin-top: 40px; height: 500px;">
                          <div class="col">
                            <p class="text-center">Loading...</p>
                          </div>
                        </div>
                      </div>
                     <div class="container" *ngIf="(faq$ | async) === undefined">
                        <div class="row" style="margin-top: 40px; height: 500px;">
                           <div class="col">
                             <p class="text-center">No Content Found.</p>
                           </div>
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
export class FaqsComponent implements OnInit {
	faq$: Observable<Array<Faqs>>;
	constructor(private rootservice: RootService) { }
	ngOnInit(): void {
		this.faq$ = this.rootservice.faqs.pipe(map(res => res[0].data)) as unknown as Observable<Array<Faqs>>;
	}
}
