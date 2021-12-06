import { NgModule } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { SharedComponent } from './shared/shared.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxLoaderIndicatorModule } from 'ngx-loader-indicator';
import { UsersComponent } from './users/users.component';
import { UserConversationsComponent } from './user-conversations/user-conversations.component';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { SkeletonsModule } from 'src/app/skeletons/skeletons.module';
import { GroupByPipe, NgPipesModule } from 'ngx-pipes';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ChatService } from 'src/app/chat.service';

@NgModule({
	declarations: [
		SharedComponent,
		UsersComponent,
		UserConversationsComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		SkeletonsModule,
		NgScrollbarModule,
		InfiniteScrollModule,
		NgPipesModule,
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
	],
	providers: [AsyncPipe, GroupByPipe, ChatService]
})
export class ChatModule { }
