import { Injectable } from '@angular/core';

import { HttpService } from './http.service';
import API_ROUTES from './Api';


@Injectable()
export class AssetsService {

  constructor(private httpService: HttpService) { }

  // Get the User Conditions
  getCGU() {
    return this.httpService.get(API_ROUTES.cgu);
  }

  editCgu(newCgus: object) {
    return this.httpService
      .post(API_ROUTES.editCgu, newCgus);
  }

  // Get the team members of Ponthe
  editMembers(newMembers: object) {
    return this.httpService
      .post(API_ROUTES.editMembers, newMembers);
  }

  // Get admin useful links
  getUsefulLinks() {
    return this.httpService.get(API_ROUTES.getUsefulLinks);
  }

  editUsefulLinks(newUsefulLinks: object) {
    return this.httpService
      .post(API_ROUTES.editUsefulLinks, newUsefulLinks);
  }
}
