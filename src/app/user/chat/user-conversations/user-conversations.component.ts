import { AfterViewInit, ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { fadeInOnEnterAnimation, fadeOutOnLeaveAnimation } from 'angular-animations';
import { NgScrollbar } from 'ngx-scrollbar';
import { map } from 'rxjs/operators';
import { Chat } from 'src/app/interface';
import { SubSink } from 'subsink';

@Component({
	selector: 'app-user-conversations',
	template: `
	<div id="Messages" class="testimonial-style3" [loader]="isSearchMore">
	<ng-scrollbar class="my-scrollbar" [appearance]="'compact'" [position]="'native'" [track]="'vertical'" [visibility]="'native'" #scrollable2>
	<div class="chatconten" *ngIf="chats" [@fadeInOnEnter] [@fadeOutOnLeave]>
		<div *ngFor="let chat of chats">
		<div [id]="chat.date" class="timeline text-center page-title">
			<p class="line"></p>
			<span class="timer">{{chat?.date | date: 'EEE, d MMM, y'}}</span>
		</div>
		<div class="" *ngFor="let item of chat?.data">
			<!-- left -->
			<div id="{{ 'wave' + item.chatID }}" class="main-tems d-flex" *ngIf="item?.fromUserId === receiverID">
			<div class="chat-img" *ngIf="item?.fromUserId === receiverID">
				<img src="assets/images/profile-user-sm.png" alt="img">
			</div>
			<div [id]="item.chatID" class="otherchat item-chat" *ngIf="item?.fromUserId === receiverID">
				<div class="arrow-left">
				</div>
				<div class="titlechat">
					<a href="#" [name]="item.senderName" [id]="item.senderName">{{item?.senderName | titlecase}}</a>
					<span class="ch-time pull-right" [id]="item.time">{{item?.time}}</span>
					<div class="clear"></div>
				</div>
				<div class="dicrip-tx">
					<p [id]="item.message">{{item?.message}}</p>
				</div>
			</div>
			</div>
			<!-- right -->
			<div [id]="item.chatID" class="main-tems d-flex" *ngIf="item?.fromUserId === userID">
			<div class="mychat item-chat ml-auto" *ngIf="item?.fromUserId === userID">
				<div class="arrow-right">
				</div>
				<div class="titlechat">
					<a href="#" [name]="item.senderName" [id]="item.senderName">{{item?.senderName | titlecase}}</a>
					<span class="ch-time pull-right">{{item?.time}}</span>
					<div class="clear"></div>
				</div>
				<div class="dicrip-tx">
					<p>{{item?.message}}</p>
				</div>
			</div>
			<div class="chat-img" *ngIf="item?.fromUserId === userID">
				<img src="assets/images/user_img.jpg" alt="img">
			</div>
			</div>
			<div id="elle" class="clear">
			</div>
		</div>
		</div>
	</div>
	</ng-scrollbar>
</div>`,
	styles: [
		`.my-scrollbar {
			--scrollbar-hover-size: 8px;
			--scrollbar-thumb-hover-color: grey;;
			--scrollbar-padding: 0px;
			--scrollbar-overscroll-behavior: initial;
			--scrollbar-transition-duration: 400ms;
			--scrollbar-transition-delay: 800ms;
			--scrollbar-margin:0;
			--scrollbar-thumb-transition: height ease-out 150ms,width ease-out 150ms;
			box-sizing: inherit!important;
		}
		.page-title {
  			position: sticky;
  			top: 15px;
		}
		ng-scrollbar {
			height: 450px;
  			max-height: 450px;
  			overflow: hidden;
		}`
	],
	animations: [
		fadeInOnEnterAnimation(),
		fadeOutOnLeaveAnimation()
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserConversationsComponent implements OnInit, AfterViewInit, OnDestroy, OnChanges {

	subs = new SubSink();
	@Input() userID: string;
	@Input() receiverID: string;
	@Input() isSearchMore: boolean;
	@Input() chats: Chat[];

	@ViewChild('scrollable2', { static: true }) scrollbarRef2: NgScrollbar;
	@Output() more_chats: EventEmitter<{ pos: number, max: number }> =
		new EventEmitter();

	constructor() {
	}

	ngOnChanges(changes: SimpleChanges): void {
		if (!changes?.isSearchMore?.currentValue && changes?.isSearchMore?.previousValue && changes?.chats) {
			const viewportEl = this.scrollbarRef2.viewport.nativeElement;
			this.scrollbarRef2.scrollTo({ top: viewportEl.clientHeight, duration: 500 });
		}
		if (changes?.chats?.currentValue && !changes?.chats?.firstChange && changes?.chats?.previousValue && !changes?.isSearchMore) {
			this.subs.add(this.scrollbarRef2.updated.pipe().subscribe(() => this.scrollbarRef2.scrollTo({ bottom: 0, duration: 100 })));
		}
	}

	ngOnDestroy(): void {
		this.subs.unsubscribe();
	}

	ngAfterViewInit(): void {
		const viewportEl = this.scrollbarRef2.viewport.nativeElement;
		viewportEl.scrollTop = viewportEl.scrollHeight - viewportEl.clientHeight;
		// this.scrollbarRef2.scrollTo({ bottom: 0, duration: 0 });
		this.subs.add(this.scrollbarRef2.scrolled.pipe(
			map((e: any) => {
				return {
					offset: e?.target?.offsetHeight,
					pos: e?.target?.scrollTop,
					max: e?.target?.scrollHeight,
					client_height: e?.target?.clientHeight,
				};
			})
		).subscribe(s => {
			if (s.pos === 0) {
				this.more_chats.emit({ pos: s.pos, max: s.max });
			}
		}));
	}

	ngOnInit(): void {
	}

}
