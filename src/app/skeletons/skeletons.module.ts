import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersSkeletonComponent } from './users-skeleton/users-skeleton.component';
import { ConversationsSkeletonComponent } from './conversations-skeleton/conversations-skeleton.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@NgModule({
	declarations: [
		UsersSkeletonComponent,
		ConversationsSkeletonComponent
	],
	exports: [
		UsersSkeletonComponent,
		ConversationsSkeletonComponent
	],
	imports: [
		CommonModule,
		NgxSkeletonLoaderModule
	]
})
export class SkeletonsModule { }
