import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedComponent } from './shared/shared.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxLoaderIndicatorModule } from 'ngx-loader-indicator';
import { UsersComponent } from './users/users.component';
import { UserConversationsComponent } from './user-conversations/user-conversations.component';

@NgModule({
	declarations: [
		SharedComponent,
		UsersComponent,
		UserConversationsComponent
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
				path: '', component: SharedComponent
			},
		]),
	]
})
export class ChatModule { }
