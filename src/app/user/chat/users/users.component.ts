import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-users',
	template: `
					<div class="">
						<div class="aside-chat">
							<div class="search_content p-3">
								<div class="position-relative">
									<div class="form-group mb-0">
										<div class="searchicon"><i
												class="fa fa-search"></i>
										</div>
										<input type="text" class="form-control"
											id="search" name="search"
											placeholder="Search All Categories">
									</div>
								</div>
							</div>

							<div class="chat-user-listing">
								<ul>
									<li class="meetings-list">
										<a href="#" class="active">
											<div
												class="meetings-schedul-list d-flex">
												<div
													class="leftuser-img resultimg-circle">
													<img src="assets/images/handyman_services.png"
														alt="">
												</div>
												<div
													class="right-userdetails">

													<h6
														class="mb-0">
														Fikri
														Ruslandi
													</h6>
													<div
														class="detailsmall row m-0">
														<small>Ko,
															Kumaha
															Project
															anu
															eta</small>
													</div>
												</div>
												<time
													class="timimessage ml-auto">4:45
													PM</time>
											</div>
										</a>
									</li>

									<li class="meetings-list">
										<a href="#">
											<div
												class="meetings-schedul-list d-flex">
												<div
													class="leftuser-img resultimg-circle">
													<img src="assets/images/haircut_ome.png"
														alt="">
												</div>
												<div
													class="right-userdetails">

													<h6
														class="mb-0">
														Fikri
														Ruslandi
													</h6>
													<div
														class="detailsmall row m-0">
														<small>Ko,
															Kumaha
															Project
															anu
															eta</small>
													</div>
												</div>
												<time
													class="timimessage ml-auto">4:45
													PM</time>
											</div>
										</a>
									</li>
									<li class="meetings-list">
										<a href="#">
											<div
												class="meetings-schedul-list d-flex">
												<div
													class="leftuser-img resultimg-circle">
													<img src="assets/images/garden_care.png"
														alt="">
												</div>
												<div
													class="right-userdetails">

													<h6
														class="mb-0">
														Fikri
														Ruslandi
													</h6>
													<div
														class="detailsmall row m-0">
														<small>Ko,
															Kumaha
															Project
															anu
															eta</small>
													</div>
												</div>
												<time
													class="timimessage ml-auto">4:45
													PM</time>
											</div>
										</a>
									</li>
									<li class="meetings-list">
										<a href="#">
											<div
												class="meetings-schedul-list d-flex">
												<div
													class="leftuser-img resultimg-circle">
													<img src="assets/images/computer_repairing.png"
														alt="">
												</div>
												<div
													class="right-userdetails">

													<h6
														class="mb-0">
														Fikri
														Ruslandi
													</h6>
													<div
														class="detailsmall row m-0">
														<small>Ko,
															Kumaha
															Project
															anu
															eta</small>
													</div>
												</div>
												<time
													class="timimessage ml-auto">4:45
													PM</time>
											</div>
										</a>
									</li>
									<li class="meetings-list">
										<a href="#">
											<div
												class="meetings-schedul-list d-flex">
												<div
													class="leftuser-img resultimg-circle">
													<img src="assets/images/electrician.png"
														alt="">
												</div>
												<div
													class="right-userdetails">

													<h6
														class="mb-0">
														Fikri
														Ruslandi
													</h6>
													<div
														class="detailsmall row m-0">
														<small>Ko,
															Kumaha
															Project
															anu
															eta</small>
													</div>
												</div>
												<time
													class="timimessage ml-auto">4:45
													PM</time>
											</div>
										</a>
									</li>
									<li class="meetings-list">
										<a href="#">
											<div
												class="meetings-schedul-list d-flex">
												<div
													class="leftuser-img resultimg-circle">
													<img src="assets/images/salon_home.png"
														alt="">
												</div>
												<div
													class="right-userdetails">

													<h6
														class="mb-0">
														Fikri
														Ruslandi
													</h6>
													<div
														class="detailsmall row m-0">
														<small>Ko,
															Kumaha
															Project
															anu
															eta</small>
													</div>
												</div>
												<time
													class="timimessage ml-auto">4:45
													PM</time>
											</div>
										</a>
									</li>
									<li class="meetings-list">
										<a href="#">
											<div
												class="meetings-schedul-list d-flex">
												<div
													class="leftuser-img resultimg-circle">
													<img src="assets/images/user_img.jpg"
														alt="">
												</div>
												<div
													class="right-userdetails">

													<h6
														class="mb-0">
														Fikri
														Ruslandi
													</h6>
													<div
														class="detailsmall row m-0">
														<small>Ko,
															Kumaha
															Project
															anu
															eta</small>
													</div>
												</div>
												<time
													class="timimessage ml-auto">4:45
													PM</time>
											</div>
										</a>
									</li>
								</ul>
							</div>
						</div>
					</div>
	`,
	styles: [
	]
})
export class UsersComponent implements OnInit {

	constructor() { }

	ngOnInit(): void {
	}

}
