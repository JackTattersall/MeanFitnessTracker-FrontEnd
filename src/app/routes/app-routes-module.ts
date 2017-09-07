import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from '../base/home/home.component';
import {LoginComponent} from '../auth/login/login.component';
import {RegisterComponent} from '../auth/register/register.component';
import {RegisterSuccessComponent} from '../auth/register-success/register-success.component';
import {RegisterFailureComponent} from '../auth/register-failure/register-failure.component';
import {RegisterEmailSentComponent} from '../auth/register-email-sent/register-email-sent.component';
import {VitalsComponent} from '../vitals/vitals.component';
import {AuthGuard} from '../auth/guards/auth-guard.service';

const routes: Routes = [
  // Auth routes
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'register/success', component: RegisterSuccessComponent },
  { path: 'register/failure', component: RegisterFailureComponent },
  { path: 'register/sent', component: RegisterEmailSentComponent },
  { path: 'vitals', component: VitalsComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutesModule {}
