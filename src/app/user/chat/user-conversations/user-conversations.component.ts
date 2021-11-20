import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-user-conversations',
	template: `
					<div class="card">
						<div class="inbox-section">
							<div class="right-detail">
								<div class="tp-chat-tital d-flex">
									<h5 class="onlive-chater m-0"><img
											src="assets/images/handyman_services.png"
											alt=""> &nbsp; Fikri Ruslandi
									</h5>
									<div class="dropdown deedit-dor ml-auto">
										<a aria-expanded="false" href="#"
											class="dropdown-toggle"
											data-toggle="dropdown"><i
												class="fa fa-ellipsis-v"></i></a>
										<ul class="dropdown-menu dropdown-sr">
											<li><a href="#">Delete </a></li>
											<li><a href="#" data-toggle="modal"
													data-target="#ModalReport">Report</a>
											</li>
										</ul>
									</div>
								</div>

								<div class="main-message-dis">
									<div id="Messages" class="testimonial-style3">
										<div
											class="chatconten mCustomScrollbar">
											<div
												class="timeline text-center">
												<p class="line"></p>
												<span class="timer">Fri
													27 June,
													2017</span>
											</div>
											<div class="main-tems d-flex">
												<div class="chat-img">
													<img src="assets/images/handyman_services.png"
														alt="img">
												</div>
												<div
													class="otherchat item-chat">
													<div
														class="arrow-left">
													</div>
													<div
														class="titlechat">
														<a
															href="#">Rajan
															Mathes</a>
														<span
															class="ch-time pull-right">09:22
															AM</span>
														<div
															class="clear">
														</div>
													</div>
													<div
														class="dicrip-tx">
														<p>Hello
														</p>
													</div>
												</div>
											</div>
											<div class="main-tems d-flex">
												<div class="chat-img">
													<img src="assets/images/handyman_services.png"
														alt="img">
												</div>
												<div
													class="otherchat item-chat">
													<div
														class="arrow-left">
													</div>
													<div
														class="titlechat">
														<a
															href="#">Rajan
															Mathes</a>
														<span
															class="ch-time pull-right">09:22
															AM</span>
														<div
															class="clear">
														</div>
													</div>
													<div
														class="dicrip-tx">
														<p>Lorem Ipsum
															is
															simply
															dummy
															text
															of
															the
															printing
															and
															<br>typesetting
															industry.
															Lorem
															Ipsum
															has
															been
															the
															industry's
															standard
														</p>
													</div>
												</div>
											</div>

											<div class="main-tems d-flex">
												<div
													class="mychat item-chat ml-auto">
													<div
														class="arrow-right">
													</div>
													<div
														class="titlechat">
														<a
															href="#">Brandon
															Marison</a>
														<span
															class="ch-time pull-right">09:02
															AM</span>
														<div
															class="clear">
														</div>
													</div>
													<div
														class="dicrip-tx">
														<p>Lorem Ipsum
															is
															simply
															dummy
															text
															of
															the
															printing
															and
														</p>
													</div>
												</div>
												<div class="chat-img">
													<img src="assets/images/user_img.jpg"
														alt="img">
												</div>
											</div>

											<div class="main-tems d-flex">
												<div class="chat-img">
													<img src="assets/images/handyman_services.png"
														alt="img">
												</div>
												<div
													class="otherchat item-chat">
													<div
														class="arrow-left">
													</div>
													<div
														class="titlechat">
														<a
															href="#">Rajan
															Mathes</a>
														<span
															class="ch-time pull-right">09:02
															AM</span>
														<div
															class="clear">
														</div>
													</div>
													<div
														class="dicrip-tx">
														<p>Lorem Ipsum
															is
															simply
															dummy
															text
															of
															the
															printing
															and
														</p>
													</div>
												</div>
											</div>

											<div class="main-tems d-flex">
												<div
													class="mychat item-chat ml-auto">
													<div
														class="arrow-right">
													</div>
													<div
														class="titlechat">
														<a
															href="#">Brandon
															Marison</a>
														<span
															class="ch-time pull-right">09:02
															AM</span>
														<div
															class="clear">
														</div>
													</div>
													<div
														class="dicrip-tx">
														<p>Lorem Ipsum
															is
															simply
															dummy
															text
															of
															the
															printing
															and
														</p>
													</div>
												</div>
												<div class="chat-img">
													<img src="assets/images/user_img.jpg"
														alt="img">
												</div>
											</div>

											<div class="clear"></div>
										</div>
									</div>
								</div>

								<div class="replay-forward">
									<div class="type-message">
										<form method="post">
											<div class="form-group">
												<input class="form-control"
													type="text"
													placeholder="Type your message...">
												<div class="sendbutton">
													<a href="#"> <i
															class="fa fa-paper-plane"></i></a>
												</div>
												<div class="clear">
												</div>
											</div>
										</form>
									</div>
								</div>

							</div>
						</div>
					</div>
	`,
	styles: [
	]
})
export class UserConversationsComponent implements OnInit {

	constructor() { }

	ngOnInit(): void {
	}

}
