import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs/Subscription';
import {AuthenticationService} from '../../services/authentication.service';
import {User} from '../../models/user.model';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css']
})
export class AccountDetailsComponent implements OnInit, OnDestroy {

  editForm: FormGroup;

  emailEditMode = false;
  passwordEditMode = false;

  user: User;
  userSub: Subscription;

  emailValue: string;

  constructor(private formBuilder: FormBuilder, private authService: AuthenticationService) { }

  ngOnInit() {
    this.userSub = this.authService.userChanged
      .subscribe(
        user => {
          this.user = user;
          this.emailValue = user.email;
        }
      );

    this.authService.getUser();

    this.initForm();
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

  initForm() {
    this.editForm = this.formBuilder.group({
      email: [
        null,
        [ Validators.required, Validators.email ]
      ],
      password: [
        null,
        [ Validators.required, Validators.minLength(6) ]
      ],
      passwordTwo: [
        null,
        [ Validators.required, Validators.minLength(6) ]
      ]
    });
  }

  onSubmit() {
    // todo add 'loading = true' here and then make it false in the callback, and add loading animation to html
    // todo also add 'if loggedIn()' here and redirect to login page if not

    const newUser = new User();
    newUser.email = this.editForm.get('email').value;
    newUser.password = this.editForm.get('password').value;

    this.authService.register(this.user)
      .subscribe(
        user => {
          this.authService.setUser(user);
        },
        err => {
          // maybe display a message
        }
      );
  }

  onEditEmail() {
    this.emailEditMode = !this.emailEditMode;
  }

  onEditPassword() {
    this.passwordEditMode = !this.passwordEditMode;
  }

  // Tick and cross helper functions

  onEmailNo() {
    this.emailEditMode = !this.emailEditMode;
  }

  onPasswordNo() {
    this.passwordEditMode = !this.passwordEditMode;
  }

  onEmailYes() {
    if (this.email.valid) {
      this.onSubmit();
      this.emailEditMode = !this.emailEditMode;
    }
  }

  onPasswordYes() {
    if (this.password.valid && this.passwordsMatch()) {
      this.onSubmit();
      this.passwordEditMode = !this.passwordEditMode;
    }
  }

  // Form helpers

  get email() { return this.editForm.get('email'); }
  get password() { return this.editForm.get('password'); }
  get passwordTwo() { return this.editForm.get('passwordTwo'); }

  emailRequiredError(): boolean {
    return this.email.errors.required;
  }

  validEmailError(): boolean {
    return this.email.errors.email;
  }

  passwordRequiredError(): boolean {
    return this.password.errors.required;
  }

  passwordMinLengthError(): boolean {
    return this.password.errors.minlength;
  }

  passwordsMatch(): boolean {
    return this.password.value === this.passwordTwo.value;
  }
}
