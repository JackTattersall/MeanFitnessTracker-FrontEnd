import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './base/home/home.component';
import { HeaderComponent } from './base/header/header.component';
import {AppRoutesModule} from './routes/app-routes-module';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import {AuthenticationService} from "./services/authentication.service";
import {FormBuilder, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {HttpClientModule} from "@angular/common/http";
import { RegisterSuccessComponent } from './auth/register-success/register-success.component';
import { RegisterFailureComponent } from './auth/register-failure/register-failure.component';
import { RegisterEmailSentComponent } from './auth/register-email-sent/register-email-sent.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    RegisterSuccessComponent,
    RegisterFailureComponent,
    RegisterEmailSentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutesModule,
    ReactiveFormsModule,
    FormsModule,
    HttpModule,
  ],
  providers: [AuthenticationService, FormBuilder],
  bootstrap: [AppComponent]
})
export class AppModule { }
