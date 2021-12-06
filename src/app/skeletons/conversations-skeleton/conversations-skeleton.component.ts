import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-conversations-skeleton',
	template: `
	<div id="Messages" class="testimonial-style3">
	<div class="chatconten mCustomScrollbar">
		<div class="timeline text-center">
			<p class="line">
			</p>
			<ngx-skeleton-loader count="1"
					[theme]="{ height: '18px', 'margin-bottom': '0px', width: '15%', 'border-radius':'5px' }">
			</ngx-skeleton-loader>
		</div>
		<div class="main-tems">
			<div class="d-flex justify-content-center m-5">
				<img src="assets/images/Reload-1s-51px.gif" />
			</div>
		</div>
		<div class="clear">
		</div>
	</div>
	</div>`,
	styles: [
	]
})
export class ConversationsSkeletonComponent implements OnInit {

	constructor() { }

	ngOnInit(): void {
	}

}
