import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '../../services/user.service';
import { routesAppFromRoot } from '../../Routes';

@Component({
  selector: 'app-set-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss'],
})


export class NewPasswordComponent implements OnInit {
  routes = routesAppFromRoot;
  // Reset form defined here
  setNewPasswordForm: FormGroup;
  alertSuccessVisible = false;
  alertFailureVisible = false;
  alertUnmatchedVisible = false;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private userService: UserService) {
  }

  ngOnInit() {
    this.initForm();
  }

  // Initialisation of the form when the page is initially loaded
  initForm() {
    const token = new URLSearchParams(window.location.search).get('token');
    this.setNewPasswordForm = this.formBuilder.group({
      token: [token, Validators.required],
      new_password: ['', Validators.required],
      confirmation_password: ['', Validators.required],
    });
  }

  // Submission of the reset form
  onSubmitForm() {
    const values = this.setNewPasswordForm.value;
    if (values.new_password === values.confirmation_password) {
      this.userService.setNewPassword(this.setNewPasswordForm.value).subscribe(
        (res) => { this.alertSuccessVisible = true; },
        (error) => { this.alertFailureVisible = true; }
      );
    } else {
      this.alertUnmatchedVisible = true;
    }
  }

  closeSuccessAlert() {
    this.alertSuccessVisible = false;
    this.router.navigate([routesAppFromRoot.auth]);
  }

  closeFailureAlert() {
    this.alertFailureVisible = false;
  }

  closeUnmatchedAlert() {
    this.alertUnmatchedVisible = false;
  }
}
