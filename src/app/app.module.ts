import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';

// Components to import
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
// Authentification
import { AuthComponent } from './auth/auth.component';
// Home page
import { HomeComponent } from './home/home.component';
// Galeries
import { GaleriesComponent } from './galeries/galeries.component';
import { EventComponent } from './event/event.component';
// Members page
import { MembersComponent } from './members/members.component';
// Material page
import { MaterialComponent } from './material/material.component';
// Error 404 page
import { NotfoundComponent } from './notfound/notfound.component';

// Services to import
import { HomeService } from './services/home.service';
import { GaleriesService } from './services/galeries.service';
import { MembersService } from './services/members.service';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth-guard.service';
import { UserService } from './services/user.service';


import { FooterComponent } from './footer/footer.component';
import { NewAccountComponent } from './new-account/new-account.component';
import { UserListComponent } from './user-list/user-list.component';




@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    AuthComponent,
    HomeComponent,
    GaleriesComponent,
    MembersComponent,
    MaterialComponent,
    EventComponent,
    NotfoundComponent,
    FooterComponent,
    NewAccountComponent,
    UserListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    HomeService,
    GaleriesService,
    MembersService,
    AuthService,
    AuthGuard,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
