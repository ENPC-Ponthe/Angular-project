import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '../../services/user.service';
import { routesAppFromRoot } from '../../Routes';

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.scss'],
})


export class ConfirmEmailComponent implements OnInit {
  routes = routesAppFromRoot;
  // Reset form defined here
  confirmEmailForm: FormGroup;
  alertSuccessVisible = false;
  alertFailureVisible = false;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private userService: UserService) {
  }

  ngOnInit() {
    this.initForm();
    this.onSubmitForm();
  }

  // Initialisation of the form when the page is initially loaded
  initForm() {
    const token = new URLSearchParams(window.location.search).get('token');
    this.confirmEmailForm = this.formBuilder.group({
      token: [token, Validators.required],
    });
  }

  // Submission of the reset form
  onSubmitForm() {
    if (this.confirmEmailForm.value.token) {
      this.userService.confirmEmail(this.confirmEmailForm.value).subscribe(
        (res) => { this.alertSuccessVisible = true; },
        (error) => { this.alertFailureVisible = true; }
      );
    } else {
      this.alertFailureVisible = true;
    }
  }

  closeAlert() {
    this.alertSuccessVisible = false;
    this.alertFailureVisible = false;
    this.router.navigate([routesAppFromRoot.auth]);
  }
}
