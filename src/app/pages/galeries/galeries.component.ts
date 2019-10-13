import { Component, OnInit, OnDestroy } from '@angular/core';
import { state, trigger, animate, style, transition } from '@angular/animations';

import { LoadingSpinnerComponent } from '../../components/loading-spinner/loading-spinner.component';
import { GaleriesService } from '../../services/galeries.service';
import { HttpService } from '../../services/http.service';
import { Phrases } from '../../Phrases';
import { routesAppFromRoot } from '../../Routes';

@Component({
  selector: 'app-galeries',
  templateUrl: './galeries.component.html',
  styleUrls: ['./galeries.component.scss'],
  animations : [
    // Hover animation
    trigger('galeriesTrigger', [
      state('visible', style({opacity: 1})),
      state('hidden', style({opacity: 0})),
      transition(':enter', [ animate('200ms') ] ),
    ]),
    trigger('spinnerTrigger', [
      state('visible', style({opacity: 1})),
      state('hidden', style({opacity: 0})),
      transition('* => *', [ animate('200ms') ] ),
    ])
  ]
})

export class GaleriesComponent implements OnInit {

  phrases: object;
  routes = routesAppFromRoot;

  // Loading Spinner
  displaySpinner = true;
  stateSpinner = 'visible';

  // List of events to display
  galeriesEvents = [];
  privateEvents = [];

  // Animation variables for 9 first pics
  galeriesState = ['visible', 'visible', 'visible',
                   'visible', 'visible', 'visible',
                   'visible', 'visible', 'visible'];

  constructor(private httpService: HttpService,
              private galeriesService: GaleriesService) {
    this.phrases = Phrases;
  }

  ngOnInit() {
    this.displaySpinner = this.galeriesService.displaySpinner;
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    // this.displaySpinner = true;
    // this.stateSpinner = 'visible';
    this.galeriesService.loadEvents().then(
      () => {
      this.privateEvents = this.galeriesService.privateEvents;
      this.galeriesEvents = this.galeriesService.galeriesEvents;
      this.stateSpinner = this.galeriesService.stateSpinner;
      setTimeout(() => { this.displaySpinner = this.galeriesService.displaySpinner; }, 200);
    });

  }


  // Display functions (hover and state)
  survoleGaleries(stateGaleries: string) {
    for (let pic = 0; pic < this.galeriesState.length; pic++) {
      this.galeriesState[pic] = stateGaleries;
    }
  }

  state(i) {
    return this.galeriesState[i];
  }
}
