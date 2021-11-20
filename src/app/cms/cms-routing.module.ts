import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './about-us/about-us.component';
import { CmsComponent } from './cms/cms.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { FaqsComponent } from './faqs/faqs.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { TermsComponent } from './terms/terms.component';

const routes: Routes = [
	{
		path: '', component: CmsComponent,
		children: [
			{ path: 'about-us', component: AboutUsComponent },
			{ path: 'contact-us', component: ContactUsComponent },
			{ path: 'faqs', component: FaqsComponent },
			{ path: 'privacy-policy', component: PrivacyPolicyComponent },
			{ path: 'terms-and-conditions', component: TermsComponent },
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class CmsRoutingModule { }
