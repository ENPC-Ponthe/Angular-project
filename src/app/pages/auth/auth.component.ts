import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import Api from '../../services/Api';
import { AuthService } from '../../services/auth.service';
import { BreakpointsService } from '../../services/breakpoints.service';
import { PwaService } from '../../services/Pwa.service';
import { routesAppFromRoot } from '../../Routes';
import { PATH_AUTH_VIDEO } from '../../Constants';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})

export class AuthComponent implements OnInit {
  pathAuthVideo = PATH_AUTH_VIDEO;
  ssoPath: string;
  videoPlaying = false;

  // Authentification form defined here
  userForm: FormGroup;
  routes = routesAppFromRoot;

  constructor(public authService: AuthService,
              public breakpointsService: BreakpointsService,
              public Pwa: PwaService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera

    this.initForm();
    this.ssoPath = environment.apiUrl + Api.casLogin;
  }

  // Initialisation of the form when the page is initially loaded
  initForm() {
    this.userForm = this.formBuilder.group({
      email: ['', Validators.required],
      extension: ['eleves.enpc.fr', Validators.required],
      password: ['', Validators.required]
    });
  }

  // Submission of the form
  onSignIn() {
    this.userForm.value.email += '@' + this.userForm.value.extension;
    this.authService.signIn(this.userForm.value);
  }

  closeAlert() {
    this.authService.loginError = false;
  }

  installPwa(): void {
    this.Pwa.installPwa();
  }

  onVideoPlay() {
    this.videoPlaying = true;
  }
}
