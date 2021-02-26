import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';

import { BUTTON_LINKS_ADMIN } from '../../Constants';
import { environment } from 'src/environments/environment';

const TABS = [
  { name: 'private-galleries', title: 'dashboard.tabs.privateGalleries' },
  { name: 'manage', title: 'dashboard.tabs.manage' },
];

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})

export class DashboardComponent implements OnInit {
  buttonLinks = BUTTON_LINKS_ADMIN;
  tutorialsVisible = false;
  adminUsefulLinksVisible = false;

  availableTabs = TABS;
  selectedTab = this.availableTabs[0].name;

  // constructor(private router: Router) { }
  constructor() { }

  ngOnInit() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }

  changeTab(newTab: string) {
    this.selectedTab = newTab;
  }

  // On click on button "Modérer"
  navigateToModeration() {
    // TODO : implement moderation on this Angular version
    // this.router.navigate([routesAppFromRoot.moderation]);
    window.location.href = environment.baseUrl + '/v1/moderation';
  }

  displayTutorials() {
    this.tutorialsVisible = !this.tutorialsVisible;
  }

  displayUsefulLinks() {
    this.adminUsefulLinksVisible = !this.adminUsefulLinksVisible;
  }
}
