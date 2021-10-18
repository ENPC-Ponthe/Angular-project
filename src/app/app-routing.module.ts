import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { routesApp } from './Routes';

// Service which protects the routes
import { AdminGuard } from './services/admin-guard.service';
import { AuthGuard } from './services/auth-guard.service';

//// COMPONENTS
import { AuthComponent } from './pages/auth/auth.component';
import { NewAccountComponent } from './pages/new-account/new-account.component';
import { CguComponent } from './pages/cgu/cgu.component';
import { ResetComponent } from './pages/reset/reset.component';
import { NewPasswordComponent } from './pages/new-password/new-password.component';
import { ConfirmEmailComponent } from './pages/confirm-email/confirm-email.component';
import { HomeComponent } from './pages/home/home.component';
import { VestibuleComponent } from './pages/vestibule/vestibule.component';
import { FilmographyComponent } from './pages/filmography/filmography.component';
import { GaleriesComponent } from './pages/galeries/galeries.component';
import { CrushComponent } from './pages/crush/crush.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MembersComponent } from './pages/members/members.component';
import { MaterialComponent } from './pages/material/material.component';
import { EventComponent } from './pages/event/event.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { ModerationComponent } from './pages/moderation/moderation.component';
import { VideoComponent } from './pages/video/video.component';

export const routes: Routes = [
  { path: '', canActivate: [AuthGuard], component: HomeComponent },
  { path: routesApp.auth, component: AuthComponent, data: { animation: 'AuthPage' } },
  { path: routesApp.newAccount, component: NewAccountComponent, data: { animation: 'NewAccountPage' } },
  { path: routesApp.cgu, component: CguComponent, data: { animation: 'CguPage' } },
  { path: routesApp.reset, component: ResetComponent, data: { animation: 'ResetPage' } },
  { path: routesApp.newPassword, component: NewPasswordComponent, data: { animation: 'NewPasswordPage' } },
  { path: routesApp.confirmEmail, component: ConfirmEmailComponent, data: { animation: 'ConfirmEmailPage' } },

  { path: routesApp.home, canActivate: [AuthGuard], component: HomeComponent, data: { animation: 'HomePage' } },

  { path: routesApp.galeries, canActivate: [AuthGuard], component: VestibuleComponent, data: { animation: 'VestibulePage' } },
  { path: routesApp.pics, canActivate: [AuthGuard], component: GaleriesComponent, data: { animation: 'GaleriesPage' } },
  { path: 'pics', redirectTo: routesApp.pics },
  { path: 'photo', redirectTo: routesApp.pics },
  { path: routesApp.pics + '/:event', canActivate: [AuthGuard], component: EventComponent, data: { animation: 'EventPage' } },
  { path: routesApp.videos, canActivate: [AuthGuard], component: FilmographyComponent, data: { animation: 'FilmographyPage' } },
  { path: 'video', redirectTo: routesApp.videos },
  { path: 'movies', redirectTo: routesApp.videos },
  { path: routesApp.videos + '/:video', canActivate: [AuthGuard], component: VideoComponent, data: { animation: 'VideoComponent' } },

  { path: routesApp.crush, canActivate: [AuthGuard], component: CrushComponent, data: { animation: 'CrushPage' } },

  { path: routesApp.dashboard, canActivate: [AuthGuard, AdminGuard], component: DashboardComponent, data: { animation: 'DashboardPage' } },
  { path: 'dash', redirectTo: routesApp.dashboard },
  { path: 'board', redirectTo: routesApp.dashboard },
  { path: 'admin', redirectTo: routesApp.dashboard },
  {
    path: routesApp.moderation, canActivate: [AuthGuard, AdminGuard], component: ModerationComponent,
    data: { animation: 'ModerationPage' }
  },
  { path: 'modo', redirectTo: routesApp.moderation },

  { path: routesApp.members, canActivate: [AuthGuard], component: MembersComponent, data: { animation: 'MembersPage' } },
  { path: 'membres', redirectTo: routesApp.members },

  { path: routesApp.material, canActivate: [AuthGuard], component: MaterialComponent, data: { animation: 'MaterialPage' } },
  { path: 'matos', redirectTo: routesApp.material },

  { path: routesApp.notFound, canActivate: [AuthGuard], component: NotfoundComponent },
  { path: '**', canActivate: [AuthGuard], redirectTo: routesApp.notFound }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
