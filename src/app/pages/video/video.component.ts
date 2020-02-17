import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { state, trigger, animate, style, transition } from '@angular/animations';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
// import { Plyr } from 'plyr';
// import { PlyrComponent } from 'ngx-plyr';

import { LoadingSpinnerComponent } from '../../components/loading-spinner/loading-spinner.component';
import { GaleriesFooterComponent } from '../../components/galeries-footer/galeries-footer.component';
import { UploadComponent } from '../../components/upload/upload.component';
import { GaleriesModerationButtonsComponent } from '../../components/galeries-moderation-buttons/galeries-moderation-buttons.component';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss'],
  animations : [
    trigger('spinnerTrigger', [
      state('visible', style({opacity: 1})),
      state('hidden', style({opacity: 0})),
      transition('* => *', [ animate('200ms') ] ),
    ])
  ]
})

export class VideoComponent implements OnInit, OnDestroy {

  constructor(private activeRoute: ActivatedRoute,
              private httpService: HttpService) {
    this.sub = activeRoute.fragment.pipe(filter(f => !!f)).subscribe(
      f => document.getElementById(f).scrollIntoView({ behavior : 'smooth' })
    );
  }

  // Loading Spinner
  displaySpinner = true;
  stateSpinner = 'visible';

  private sub: Subscription;

  adresse: string;

  // About the film
  name: string;
  resume: string;
  filmBackground: string;

  // Variables about the user and the current operations on the event
  isAdmin: boolean;
  selectedRoute: string;

  // State of the pictures in moderation phase : true means the pic is going to be deleted
  moderationState = [];

  // get the component instance to have access to plyr instance
  // @ViewChild(PlyrComponent)
  // plyr: PlyrComponent;

  // player: Plyr;

  // videoSources: Plyr.Source[] = [
  //   {
  //     src: 'bTqVqk7FSmY',
  //     provider: 'youtube',
  //   },
  // ];

  ngOnInit() {
    const selectedRoute = this.activeRoute.snapshot.params.event;
    this.httpService.currentGallery = selectedRoute;
    this.adresse = this.activeRoute.snapshot.routeConfig.path;
    this.isAdmin = this.httpService.isAdmin;

    // MOCK VALUES, FOR DEVELOPMENT
    this.displaySpinner = false;
    this.name = 'Vidéo de test';
    this.resume = 'Ceci est une galerie de tests.';
    this.filmBackground = 'assets/images/font1.jpg';
  }

  public ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  // Tell if a picture is going to be deleted or not
  deleteState(i) {
    return this.moderationState[i];
  }

  // Change the state of moderation of a picture
  moderePic(i: number) {
    this.moderationState[i] = !this.moderationState[i];
  }
}
