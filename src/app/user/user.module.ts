import { NgModule } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { SharedComponent } from './shared/shared.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxLoaderIndicatorModule } from 'ngx-loader-indicator';
import { UserGuard } from '../user.guard';
import { NgScrollbarModule } from 'ngx-scrollbar';

@NgModule({
	declarations: [SharedComponent],
	imports: [
		CommonModule,
		FormsModule,
		NgScrollbarModule,
		NgxLoaderIndicatorModule.forRoot({
			loaderStyles: {
				background: 'rgba(253 252 246 / 2%)',
			},
		}),
		ReactiveFormsModule,
		RouterModule.forChild([
			{
				path: '', component: SharedComponent,
				children: [
					{
						path: '', redirectTo: 'chat', pathMatch: 'full'
					},
					{
						path: 'chat',
						loadChildren: () => import('./chat/chat.module').then((m) => m.ChatModule),
						data: {
							seo: {
								title: 'MY-ACCOUNT | AANI DANI',
								metaTags: [
									{ name: 'keywords', content: 'Restaurant Order management, Restaurant Kitchen management, Hotel Management' },
									{ name: 'description', content: 'softQ is a Online Restaurant order management.' },
									{ name: 'robots', content: 'index, follow' }
								]
							}
						},
						canActivate: [UserGuard]
					}
				]
			},
		]),
	],
	providers: [AsyncPipe]
})
export class UserModule { }
