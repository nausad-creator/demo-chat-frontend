import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { hueRotateAnimation } from 'angular-animations';
import { User } from 'src/app/interface';
import { RootService } from 'src/app/root.service';
import { SubSink } from 'subsink';

@Component({
	selector: 'app-users',
	template: `
	<li class="meetings-list" *ngFor="let user of users; let i=index">
	<a [@hueRotate]="state" (@hueRotate.done)="togglehue()" data-toggle="modal" href="#" (click)="change_user.emit({userID: user?.userID, userName: user?.userFirstName + ' ' + user?.userLastName})" [ngClass]="{'active':selected===user?.userID}">
		<div class="meetings-schedul-list d-flex">
			<div class="leftuser-img resultimg-circle">
				<img [title]="(user?.userFirstName + ' ' + user?.userLastName) | titlecase" src="assets/images/profile-user-sm.png" alt="">
			</div>
			<div class="right-userdetails">

				<h6 [title]="(user?.userFirstName + ' ' + user?.userLastName) | titlecase" class="mb-0">{{(user?.userFirstName + ' ' + user?.userLastName) | titlecase}}
				<span *ngFor="let status of users_status"><i title="Online" *ngIf="status?.userID===user?.userID" class="fa fa-circle" [ngClass]="{'green': status?.userID===user?.userID}" aria-hidden="true"></i></span>
				</h6>
				<div class="detailsmall row m-0">
					<small>{{user?.chats?.message}}</small>
				</div>
			</div>
			<time class="timimessage ml-auto">{{user?.chats?.time}}</time>
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
	],
	changeDetection: ChangeDetectionStrategy.Default,
})
export class UsersComponent implements OnInit {
	@Input() users: User[];
	@Input() users_status: { userID: string }[];
	@Input() selected: string;
	state = false;
	subs = new SubSink();
	@Output() change_user: EventEmitter<{ userID: string, userName: string }>
		= new EventEmitter();
	constructor(private root: RootService) { }
	ngOnInit(): void {
		this.togglehue();
		this.state = false;
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
