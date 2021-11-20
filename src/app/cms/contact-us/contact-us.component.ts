import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-contact-us',
	template: `
  <main id="main" style="overflow:hidden;position:relative;">
	<!--<div class="header-shape">
		<img src="assets/images/header_shap.png">
	</div>-->
	<div class="sapretor"></div>

    <section class="dshbord-section pt-3 pb-3">
      <div class="container">
		<div class="card mb-3">
			<div class="p-3">
				<h4 class="mb-0 text-dark page-title-main">Contact Us</h4>
			</div>
			<hr class="m-0">
			<div class="card-body">
				<div class="row cmspage-content">
					<div class="col-lg-6 col-md-12 pb-3">
						<h5>Administrative Office</h5>
						<div class="contact-item d-flex">
							<div class="contact-icon mt-3"><i class="fa fa-map"></i></div>
							<div class="notifi-text">
								<h5 class="mb-2">Our Address</h5>
								<p>The English Monk, "Shiva Garden", Opp B.M.T.C Bus Depot, Old Madras Road, Nashik, Maharastra - 562 114, <br>Maharastra, India.</p>
							</div>
						</div>
						<div class="contact-item d-flex">
							<div class="contact-icon mt-3"><i class="fa fa-phone"></i></div>
							<div class="notifi-text">
								<h5 class="mb-2">Call Us</h5>
								<a href="tel:+123 4567 8901"> +123 4567 8901</a> /
								<a href="tel:+123 4567 8902"> +123 4567 8902</a>
							</div>
						</div>
						<div class="contact-item d-flex">
							<div class="contact-icon"><i class="fa fa-envelope"></i></div>
							<div class="notifi-text">
								<h5 class="mb-0">Email Us</h5>
								<a href="mailto:info@tejastravels.com">info@englishmonk.com</a>
							</div>
						</div>
						<div class="contact-item d-flex">
							<div class="contact-icon"><i class="fa fa-globe"></i></div>
							<div class="notifi-text">
								<h5 class="mb-0">Our Website</h5>
								<a href="#">www.englishmonk.com</a>
							</div>
						</div>
					</div>
					<div class="col-lg-5 col-md-12">
						<h5>Customer Complaints</h5>
						<form method="post" ction="#" id="myform" role="form" class="loginform formtraveler pt-3 needs-validation" novalidate="novalidate">
							 <div class="form-row pt-3">
								<div class="col-xl-12 form-group">
									<label for="Name">Name</label>
									<input type="text" class="form-control" id="name" name="name" placeholder="Enter your name" required="">
									<div class="invalid-feedback">Please enter your name</div>
								</div>
								<div class="col-xl-12 form-group">
									<label for="Email">Email</label>
									<input type="text" class="form-control" id="Email" placeholder="Enter your email" name="Email" required="">
									<div class="invalid-feedback">Please enter your email</div>
								</div>
								<div class="col-xl-12 form-group">
									<label for="Subject">Subject</label>
									<input type="text" class="form-control" id="Subject" name="Subject" placeholder="Enter your subject" required="">
									<!--<select class="custom-select" required="">
									  <option selected="">Select Subject</option>
									  <option value="1">Students</option>
									  <option value="2">Teacher</option>
									  <option value="3">Parents</option>
									</select>-->
									<div class="invalid-feedback">Please enter your subject </div>
								</div>
								<div class="col-xl-12 form-group">
									<label for="Complaints">Message</label>
									<textarea type="text" class="form-control" id="msg" name="msg" placeholder="Message here..." required=""></textarea>
									<div class="invalid-feedback">Please enter your message</div>
								</div>
							 </div>
							<button type="submit" class="btn get-started-btn mb-3">Submit</button>
						</form>
					</div>
				</div>
			</div>
		</div>
      </div>
    </section>
  </main>
  `,
	styles: [
	]
})
export class ContactUsComponent implements OnInit {

	constructor() { }

	ngOnInit(): void {
	}

}
