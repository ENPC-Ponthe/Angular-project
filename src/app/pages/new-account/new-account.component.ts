import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { User } from '../../models/User.model';
import { UserService } from '../../services/user.service';
import { routesAppFromRoot } from '../../Routes';
import { AVAILABLE_PROMOTIONS } from '../../Constants';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.scss'],
})

export class NewAccountComponent implements OnInit {
  availablePromotions = AVAILABLE_PROMOTIONS;
  routes = routesAppFromRoot;
  // Register form defined here
  userForm: FormGroup;

  alertTitle = '';
  alertSuccessVisible = false;
  alertErrorVisible = false;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private router: Router) {
  }

  ngOnInit() {
    this.initForm();
  }

  // Initialisation of the form when the page is initially loaded
  initForm() {
    this.userForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.required],
      extension: ['eleves.enpc.fr', Validators.required],
      promotion: ['', Validators.required],
      password: ['', Validators.required],
      confirmation_password: ['', Validators.required],
    });
  }

  // Submission of the registration form
  onSubmitForm() {
    this.userForm.value.email += '@' + this.userForm.value.extension;
    const formValue = this.userForm.value;
    const newUser = new User(formValue.firstname,
      formValue.lastname,
      formValue.email,
      formValue.promotion,
      formValue.password,
      formValue.confirmation_password);
    this.userService.addUser(newUser).subscribe(
      (res) => {
        this.alertSuccessVisible = true;
      },
      (error) => {
        this.alertErrorVisible = true;
      }
    );
  }

  closeAlertSuccess() {
    this.alertSuccessVisible = false;
    this.router.navigate([routesAppFromRoot.auth]);
  }
  closeAlertError() {
    this.alertErrorVisible = false;
  }
}
