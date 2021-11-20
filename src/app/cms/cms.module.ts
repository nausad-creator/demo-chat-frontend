import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CmsRoutingModule } from './cms-routing.module';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { FaqsComponent } from './faqs/faqs.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { TermsComponent } from './terms/terms.component';
import { CmsComponent } from './cms/cms.component';
import { SafeHtmlPipe } from './cms.pipe';


@NgModule({
	declarations: [
		AboutUsComponent,
		ContactUsComponent,
		FaqsComponent,
		PrivacyPolicyComponent,
		TermsComponent,
		CmsComponent,
		SafeHtmlPipe
	],
	imports: [
		CommonModule,
		CmsRoutingModule
	]
})
export class CmsModule { }
