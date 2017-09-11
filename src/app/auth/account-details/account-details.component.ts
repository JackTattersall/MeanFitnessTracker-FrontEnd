import { Component } from '@angular/core';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css']
})
export class AccountDetailsComponent {

  emailEditMode = false;
  passwordEditMode = false;

  emailValue = 'jack@tatts';
  passwordValue = '*******';

  constructor() { }

  onEditEmail() {
    this.emailEditMode = !this.emailEditMode;
    this.emailValue = '';
  }

  onEditPassword() {
    this.passwordEditMode = !this.passwordEditMode;
    this.passwordValue = '';
  }

  onEmailNo() {
    this.emailEditMode = !this.emailEditMode;
    this.emailValue = 'jack@tatts.com';
  }

  onPasswordNo() {
    this.passwordEditMode = !this.passwordEditMode;
    this.passwordValue = '*******';
  }

  onEmailYes() {
    this.emailEditMode = !this.emailEditMode;
  }

  onPasswordYes() {
    this.passwordEditMode = !this.passwordEditMode;
  }

}
