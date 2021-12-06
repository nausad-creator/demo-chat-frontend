import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
	{
		path: '',
		loadChildren: () => import('./landing/home.module').then((m) => m.HomeModule),
		data: {
			seo: {
				title: 'HOME | FIRST STAB',
				metaTags: [
					{ name: 'keywords', content: 'Restaurant Order management, Restaurant Kitchen management, Hotel Management' },
					{ name: 'description', content: 'softQ is a Online Restaurant order management.' },
					{ name: 'robots', content: 'index, follow' }
				]
			}
		}
	},
	{
		path: 'home',
		loadChildren: () => import('./landing/home.module').then((m) => m.HomeModule),
		data: {
			seo: {
				title: 'HOME | FIRST STAB',
				metaTags: [
					{ name: 'keywords', content: 'Restaurant Order management, Restaurant Kitchen management, Hotel Management' },
					{ name: 'description', content: 'softQ is a Online Restaurant order management.' },
					{ name: 'robots', content: 'index, follow' }
				]
			}
		}
	},
	{
		path: 'user',
		loadChildren: () => import('./user/user.module').then((m) => m.UserModule),
		data: {
			seo: {
				title: 'HOME | FIRST STAB',
				metaTags: [
					{ name: 'keywords', content: 'Restaurant Order management, Restaurant Kitchen management, Hotel Management' },
					{ name: 'description', content: 'softQ is a Online Restaurant order management.' },
					{ name: 'robots', content: 'index, follow' }
				]
			}
		}
	},
	{ path: '404', component: NotFoundComponent },
	{ path: '**', redirectTo: '/404' }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
