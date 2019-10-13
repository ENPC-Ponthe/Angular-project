import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { animate, state, style, transition, trigger } from '@angular/animations';

import { UserService } from '../../services/user.service';
import { Phrases } from '../../Phrases';
import { routesAppFromRoot } from '../../Routes';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss'],
  animations : [
    // Image transitions defined here
    trigger('backgroundAnimation', [
      // Various states defined as landmarks
      state('visible1', style({opacity: 0.75,
                               transform: 'translateX(0)',
                               backgroundImage : 'url("../../../assets/images/auth_pics/wei.jpg")'})),
      state('hidden1', style({opacity: 0.25,
                              transform: 'translateX(-15%)',
                              backgroundImage : 'url("../../../assets/images/auth_pics/wei.jpg")'})),
      state('visible2', style({opacity: 0.75,
                               transform: 'translateX(0)',
                               backgroundImage : 'url("../../../assets/images/auth_pics/font1.jpg")'})),
      state('hidden2', style({opacity: 0.25,
                              transform: 'translateX(-15%)',
                              backgroundImage : 'url("../../../assets/images/auth_pics/font1.jpg")'})),
      state('visible3', style({opacity: 0.75,
                               transform: 'translateX(0)',
                               backgroundImage : 'url("../../../assets/images/auth_pics/pom.jpg")'})),
      state('hidden3', style({opacity: 0.25,
                              transform: 'translateX(-15%)',
                              backgroundImage : 'url("../../../assets/images/auth_pics/pom.jpg")'})),
      state('visible4', style({opacity: 0.75,
                               transform: 'translateX(0)',
                               backgroundImage : 'url("../../../assets/images/auth_pics/voyage1.jpg")'})),
      state('hidden4', style({opacity: 0.25,
                              transform: 'translateX(-15%)',
                              backgroundImage : 'url("../../../assets/images/auth_pics/voyage1.jpg")'})),
      // Transitions between the previous states
      transition('visible1 => hidden1', [ animate(6000) ] ),
      transition('visible2 => hidden2', [ animate(6000) ] ),
      transition('visible3 => hidden3', [ animate(6000) ] ),
      transition('visible4 => hidden4', [ animate(6000) ] ),
      transition('hidden1 => visible2', [ animate(0) ] ),
      transition('hidden2 => visible3', [ animate(0) ] ),
      transition('hidden3 => visible4', [ animate(0) ] ),
      transition('hidden4 => visible1', [ animate(0) ] )
    ])
  ]
})


export class ResetComponent implements OnInit {

  routes = routesAppFromRoot;
  phrases: object;
  // Initial state
  state = 'visible1';
  indState = 0;
  // Possible states to reach (used in changeFond() )
  possibleStates = ['visible1', 'hidden1',
                    'visible2', 'hidden2',
                    'visible3', 'hidden3',
                    'visible4', 'hidden4'];

  // Reset form defined here
  resetForm: FormGroup;


  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private userService: UserService) {
    this.phrases = Phrases;
  }

  ngOnInit() {
    this.initForm();
  }

  // Initialisation of the form when the page is initially loaded
  initForm() {
    this.resetForm = this.formBuilder.group({
      email : ['', Validators.required]
    });
  }

  // Submission of the reset form
  onSubmitForm() {
    this.resetForm.value.email = this.resetForm.value.email + '@eleves.enpc.fr';
    this.userService.resetUser(this.resetForm.value).subscribe(
      (res) => { alert(Phrases['reset.sentEmail']); },
      (error) => { }
    );
    this.router.navigate([routesAppFromRoot.auth]);
  }

  // Background image transitions
  changeFond() {
    if (this.indState !== this.possibleStates.length) {
      this.indState += 1;
    } else {
      this.indState = 0;
    }
    this.state = this.possibleStates[this.indState];
  }
}
