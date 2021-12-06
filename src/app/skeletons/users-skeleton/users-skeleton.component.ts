import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-users-skeleton',
	template: `
	<ul>
	<li class="meetings-list" *ngFor="let item of random; let i=index">
	<a href="#">
		<div class="meetings-schedul-list d-flex">
			<div class="leftuser-img resultimg-circle">
				<ngx-skeleton-loader count="1" appearance="circle"
					[theme]="{ width: '40px', height: '40px'}">
				</ngx-skeleton-loader>
			</div>
			<div class="right-userdetails mt-1">
				<ngx-skeleton-loader count="1"
					[theme]="{ height: '9px', 'margin-bottom': '0px', width: '75%' }">
				</ngx-skeleton-loader>
				<div class="detailsmall row m-0">
					<ngx-skeleton-loader count="1"
						[theme]="{ height: '7px', 'margin-bottom': '0px', width: '95%' }">
					</ngx-skeleton-loader>
				</div>
			</div>
			<time class="timimessage ml-auto">
				<ngx-skeleton-loader count="1"
						[theme]="{ height: '11px', 'margin-bottom': '0px', width: '95%' }">
				</ngx-skeleton-loader>
			</time>
		</div>
	</a>
</li>
</ul>
  `,
	styles: [
	]
})
export class UsersSkeletonComponent implements OnInit {
	random = [1, 2, 3, 4];
	constructor() { }

	ngOnInit(): void {
	}

}
