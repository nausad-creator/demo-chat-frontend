import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { RootService } from 'src/app/root.service';
import { ConfirmedValidator } from './confirmvalidator';
interface Reset {
	loginfacultyID: string;
	facultyNewPassword: string;
	languageID: string;
}
interface Response {
	data: Array<[]>;
	status: string;
	message: string;
}
@Component({
	selector: 'app-reset-password',
	template: `
  <!-- The Modal ResetPassword -->
		<div class="modal-content">
		  <!-- Modal Header -->
		  <div class="modal-header pt-2 " style="border-bottom:none;">
			 <h4 class="modal-title">Reset Password</h4>
			 <button type="button" class="close" (click)="onClose()" data-dismiss="modal">&times;</button>
		  </div>
		  <!-- Modal body -->
		  <div class="modal-body ">
		  <!-- error handler -->
          <div class="alert alert-danger" role="alert" *ngIf="error">
          <h5 class="alert-heading text-center">Error!</h5>
          <p class="mb-0 text-center">{{error}}</p>
         </div>
          <!-- handler end -->
			  <form [formGroup]="resetForm"
			  (ngSubmit)="onReset(resetForm.value)" method="post" class="bootstrap-form needs-validation login-form" novalidate="novalidate" id="login-form" name="login-form">
				   <div class="form-row pb-2">
						<div class="form-group col-md-12">
							<!--<input type="password" id="NewPassword" class="form-control" placeholder="Enter New Password">-->
							<a class="eyeIconReset cursr" (click)="newPassword()"><i class="fa " [ngClass]="{'fa-eye': !new, 'fa-eye-slash': new}"></i></a>
							<input type="password" [type]=" new ? 'password' : 'text' " formControlName="facultyNewPassword"
							(keydown.space)="$event.preventDefault()" name="password" class="form-control" id="password" placeholder="Enter New Password" data-rule="minlen:4" data-msg="Please enter at least 4 chars" required />
							<small class="text-danger " *ngIf="resetForm.controls['facultyNewPassword'].hasError('required') && (resetForm.controls['facultyNewPassword'].dirty || resetForm.controls['facultyNewPassword'].touched)">Please enter new password</small>
                            <small class="text-danger " *ngIf="resetForm.controls['facultyNewPassword'].hasError('pattern') && (resetForm.controls['facultyNewPassword'].dirty || resetForm.controls['facultyNewPassword'].touched)">Password needs to be at least eight characters, one uppercase letter and one number.</small>
						</div>
						<div class="form-group col-md-12">
							<!--<input type="password" id="confirmPassword" class="form-control" placeholder="Confirm Password">-->
							<a class="eyeIconReset cursr" (click)="confirmPassword()"><i class="fa " [ngClass]="{'fa-eye': !confirm, 'fa-eye-slash': confirm}"></i></a>
							<input type="password" [type]=" confirm ? 'password' : 'text' " formControlName="facultyReEnterPassword" (keydown.space)="$event.preventDefault()" name="password" class="form-control" id="password" placeholder="Confirm Password" data-rule="minlen:4" data-msg="Please enter at least 4 chars" required />
							<small class="text-danger " *ngIf="resetForm.controls['facultyReEnterPassword'].hasError('required') && (resetForm.controls['facultyReEnterPassword'].dirty || resetForm.controls['facultyReEnterPassword'].touched)">Please enter Re-enter new password</small>
                            <small class="text-danger " *ngIf="resetForm.controls['facultyReEnterPassword'].hasError('confirmedValidator')">Re-enter Password is not match</small>
						</div>
						<div class="col-md-12 col-sm-12 pt-3 pb-3 text-center">
							<!--<a href="#" class="get-started-btn btnlogin">Save</a>-->
							<button type="submit" class="get-started-btn btnlogin">Save</button>
						</div>
				   </div>
			  </form>
		  </div>
		</div>
  `,
	styles: [
		`.modal-contents {
		position: relative;
		display: flex;
		flex-direction: column;
		width: 100%;
		pointer-events: auto;
		background-color: #fff;
		background-clip: padding-box;
		border-radius: .3rem;
		outline: 0;
	  }`,
		`.small {
		font-size: 1em;
	  }`,
		`.cursr {
		cursor: pointer;
	  }`
	],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResetPasswordComponent implements OnInit {
	list: any[] = [];
	resetForm: FormGroup;
	error: string;
	new = true;
	confirm = true;
	@Input() credential = '';
	constructor(
		private service: RootService,
		private bsModalRef: BsModalRef,
		private toastr: ToastrService,
		private fb: FormBuilder,
		private router: Router,
		private cd: ChangeDetectorRef
	) {
		// tslint:disable-next-line: deprecation
		this.resetForm = this.fb.group(
			{
				facultyNewPassword: ['', Validators.compose([Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/)])],
				facultyReEnterPassword: ['', Validators.compose([Validators.required])],
			},
			{
				validator: ConfirmedValidator('facultyNewPassword', 'facultyReEnterPassword'),
			}
		);
	}

	ngOnInit(): void {
		this.credential = JSON.parse(this.list[0].res);
	}

	newPassword = () => {
		this.new = !this.new;
	}
	confirmPassword = () => {
		this.confirm = !this.confirm;
	}
	onClose = () => {
		this.bsModalRef.hide();
	}

	onReset = (post: Reset) => {
		this.markFormTouched(this.resetForm);
		const invalidInputs = this.findInvalidControls();
		if (this.resetForm.valid && invalidInputs.length === 0) {
			this.error = '';
			const json = {
				loginfacultyID: JSON.parse(this.credential).facultyID,
				facultyNewPassword: post.facultyNewPassword,
				languageID: '1',
			};
			this.reset(JSON.stringify(json)).then((data: string) => {
				if (data) {
					this.resetForm.reset();
					this.bsModalRef.hide();
					setTimeout(() => {
						this.toastr.success('Password updated successfully');
					}, 500);
				} else {
					this.error = 'error occured, please try again later.';
					this.cd.markForCheck();
				}
			}).catch((error) => {
				this.error = error;
				console.error(error);
				this.cd.markForCheck();
			});
		}
	}

	reset = (post: string) => {
		return new Promise((resolve, reject) => {
			this.service.resetPassword(post).subscribe((response: Array<Response>) => {
				if (response[0].status === 'true') {
					resolve(JSON.stringify(response[0].data[0]));
				} else {
					reject(response[0].message);
				}
			}, () => reject('Some error occured, please try again later'));
		});
	}

	findInvalidControls = () => {
		const invalid = [];
		const controls = this.resetForm.controls;
		for (const name in controls) {
			if (controls[name].invalid) {
				invalid.push(name);
			}
		}
		return invalid;
	}

	markFormTouched = (group: FormGroup) => {
		Object.keys(group.controls).forEach((key: string) => {
			const control = group.controls[key];
			if (control instanceof FormGroup) {
				control.markAsTouched();
				this.markFormTouched(control);
			} else {
				control.markAsTouched();
			}
		});
	}
}
