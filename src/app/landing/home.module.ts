import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ForgotComponent } from './forgot/forgot.component';
import { NgxLoaderIndicatorModule } from 'ngx-loader-indicator';
import { HomeComponent } from './home/home.component';
import { OtpComponent } from './otp/otp.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SignupComponent } from './signup/signup.component';

@NgModule({
	declarations: [
		HomeComponent,
		SignupComponent,
		ForgotComponent,
		OtpComponent,
		ResetPasswordComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		NgxLoaderIndicatorModule.forRoot({
			loaderStyles: {
				background: 'rgba(253 252 246 / 2%)',
			},
		}),
		ReactiveFormsModule,
		RouterModule.forChild([
			{
				path: '', component: HomeComponent
			},
		]),
	]
})
export class HomeModule { }
