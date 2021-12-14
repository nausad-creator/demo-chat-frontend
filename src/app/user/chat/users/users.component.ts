import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { hueRotateAnimation } from 'angular-animations';
import { User } from 'src/app/interface';
import { RootService } from 'src/app/root.service';
import { SubSink } from 'subsink';

@Component({
	selector: 'app-users',
	template: `
	<li class="meetings-list" *ngFor="let user of users | orderBy: ['-userStatus', 'userFirstName']; trackBy: user_status;let i=index">
	<a [@hueRotate]="state" (@hueRotate.done)="togglehue()" data-toggle="modal" href="#" (click)="change_user.emit({
		userID: user?.userID,
		userName: user?.userFirstName + ' ' + user?.userLastName,
		unread: user?.unread,
		status: user?.userStatus
		})" [ngClass]="{'active':selected===user?.userID}">
		<div class="meetings-schedul-list d-flex">
			<div class="leftuser-img resultimg-circle">
				<img [title]="(user?.userFirstName + ' ' + user?.userLastName) | titlecase" src="assets/images/profile-user-sm.png" alt="">
			</div>
			<div class="right-userdetails">
				<h6 [title]="(user?.userFirstName + ' ' + user?.userLastName) | titlecase" class="mb-0">{{(user?.userFirstName + ' ' + user?.userLastName) | titlecase}}
				<i [title]="user?.userStatus === 'Online' ? 'Online' : 'Offline'" class="fa fa-circle" [ngClass]="{'green': user?.userStatus === 'Online', 'red': user?.userStatus === 'Offline'}" aria-hidden="true"></i>
				</h6>
				<div [title]="user?.unread + ' ' + 'unread ' + (user?.unread > 1 ? 'chats' : 'chat')" [class.notify]="user?.unread > 0"><span [class.point]="user?.unread > 0" *ngIf="user?.unread > 0">{{user?.unread > 9 ? '9+' : user?.unread}}</span></div>
				<div class="detailsmall row m-0" *ngIf="user?.chats.length > 0">
					<small [title]="user?.userID === user?.chats[0]?.toUserId ? 'You: ' + user?.chats[0]?.message : user?.chats[0]?.senderName + ': ' + user?.chats[0]?.message">{{user?.userID === user?.chats[0]?.toUserId ? 'You: ' + user?.chats[0]?.message : user?.chats[0]?.senderName + ': ' + user?.chats[0]?.message}}</small>
				</div>
				<div class="detailsmall row m-0" *ngIf="user?.chats.length === 0">
					<small [title]="'Click to chat...'">Click to chat...</small>
				</div>
			</div>
			<time class="timimessage ml-auto" [title]="user?.chats[0]?.time">{{user?.chats[0]?.time}}</time>
		</div>
	</a>
	</li>
	`,
	styles: [
		`.green{
			color: #24f524;
			font-size: 13px;
		}
		.red{
			color: #ff7c0b;
			font-size: 12px;
		}`
	],
	animations: [
		hueRotateAnimation()
	], changeDetection: ChangeDetectionStrategy.Default,
})
export class UsersComponent implements OnInit {
	@Input() users: User[];
	@Input() users_status: { userID: string }[];
	@Input() selected: string;
	state = false;
	subs = new SubSink();
	@Output() change_user: EventEmitter<{
		userID: string,
		userName: string,
		unread: number,
		status: string
	}>
		= new EventEmitter();
	constructor(private root: RootService) { }
	ngOnInit(): void {
		this.togglehue();
		this.state = false;
	}
	user_status = (i: number, user: User) => {
		return user;
	}
	animatehue = () => {
		this.root.updatehue$.next(true);
	}
	togglehue = () => {
		this.subs.add(this.root.hue$.subscribe(animate => {
			if (animate) {
				this.state = !this.state;
			}
			if (!animate) {
				this.state = true;
			}
		}));
	}

}
