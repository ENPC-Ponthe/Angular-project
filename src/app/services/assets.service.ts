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
}
