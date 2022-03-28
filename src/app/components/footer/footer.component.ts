import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { HttpService } from '../../services/http.service';
import { BreakpointsService } from 'src/app/services/breakpoints.service';
import { routesApp } from 'src/app/Routes';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})

export class FooterComponent {

  constructor(private httpService: HttpService,
    private breakpointsService: BreakpointsService,
    private router: Router) {
  }

  get isOnline() {
    return (
      (this.httpService.token !== null) &&
      !(this.router.url.includes(routesApp.galeries)) &&
      !(this.router.url.includes(routesApp.dashboard)) &&
      !(this.router.url.includes(routesApp.reset)) &&
      !(this.router.url.includes(routesApp.auth)) &&
      !(this.router.url.includes(routesApp.newAccount))
    );
  }
}
