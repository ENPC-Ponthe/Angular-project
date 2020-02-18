import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService) {
              }

  canActivate = async (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) => {
    const ticket = route.queryParams.ticket;
    if (ticket !== undefined) {
      this.authService.casLogin(ticket);
      this.authService.casAuthentication(ticket);
    }

    this.authService.getUserByJWT();
    if (this.authService.isAuth) {
      return true;
    }
    return false;
  }
}
