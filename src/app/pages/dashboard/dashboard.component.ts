import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { BUTTON_LINKS_ADMIN } from '../../Constants';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})

export class DashboardComponent implements OnInit {
  buttonLinks = BUTTON_LINKS_ADMIN;
  tutorialsVisible = false;
  adminUsefulLinksVisible = false;

  constructor(private router: Router) { }

  ngOnInit() { }

  // On click on button "Modérer"
  navigateToModeration() {
    // TODO : implement moderation on this Angular version
    // this.router.navigate([routesAppFromRoot.moderation]);
    window.location.href = 'https://ponthe-testing.enpc.org/v1/moderation';
  }

  displayTutorials() {
    this.tutorialsVisible = !this.tutorialsVisible;
  }

  displayUsefulLinks() {
    this.adminUsefulLinksVisible = !this.adminUsefulLinksVisible;
  }
}
