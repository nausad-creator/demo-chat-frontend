import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NotFoundComponent } from './not-found/not-found.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { RootService } from './root.service';
import { CookieService } from 'ngx-cookie-service';
import { NgxLoaderIndicatorModule } from 'ngx-loader-indicator';
import { StoreModule } from '@ngrx/store';
import { metaReducers, reducers } from '.';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './state/effects/login-register.effects';
import { environment } from 'src/environments/environment';
import { NgProgressRouterModule } from 'ngx-progressbar/router';
import { NgProgressModule } from 'ngx-progressbar';
import { Router } from '@angular/router';
import { AuthInterceptor } from './HttpErrorInterceptor';

@NgModule({
	declarations: [
		AppComponent,
		NotFoundComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		HttpClientModule,
		ReactiveFormsModule,
		FormsModule,
		LazyLoadImageModule,
		NgProgressModule,
		NgProgressRouterModule,
		NgxSkeletonLoaderModule.forRoot({ animation: 'progress' }),
		ModalModule.forRoot(),
		ToastrModule.forRoot({
			positionClass: 'toast-center-center',
			timeOut: 3000,
			preventDuplicates: true,
			maxOpened: 1,
			easeTime: 0,
		}),
		NgxLoaderIndicatorModule.forRoot({
			loaderStyles: {
				background: 'rgba(253 252 246 / 2%)',
			},
		}),
		StoreModule.forRoot(reducers, { metaReducers }),
		!environment.production ? StoreDevtoolsModule.instrument() : [],
		EffectsModule.forRoot([AuthEffects]),
	],
	providers: [
		RootService,
		CookieService,
		{
			provide: HTTP_INTERCEPTORS,
			useFactory(router: Router) {
				return new AuthInterceptor(router);
			},
			multi: true,
			deps: [Router]
		},
	],
	bootstrap: [AppComponent],
})
export class AppModule { }
