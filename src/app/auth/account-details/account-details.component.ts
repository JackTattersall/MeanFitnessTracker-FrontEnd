import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs/Subscription';
import {AuthenticationService} from '../../services/authentication.service';
import {User} from '../../models/user.model';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css']
})
export class AccountDetailsComponent implements OnInit {

  editForm: FormGroup;

  emailEditMode = false;
  passwordEditMode = false;

  user: User;
  userSub: Subscription;

  emailValue = 'jack@tatts';
  passwordValue = '*******';

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
    // test code
    this.emailValue = this.editForm.get('email').value;
    this.user.email = this.editForm.get('email').value;
    console.log(this.editForm.get('email').value);
    console.log(this.editForm.get('password').value);
    console.log(this.editForm.get('passwordTwo').value);
  }

  onEditEmail() {
    this.emailEditMode = !this.emailEditMode;
    this.emailValue = '';
  }

  onEditPassword() {
    this.passwordEditMode = !this.passwordEditMode;
    this.passwordValue = '';
  }

  // Tick and cross helper functions

  onEmailNo() {
    this.emailEditMode = !this.emailEditMode;
    this.email.reset();
    this.emailValue = this.user.email;
    this.emailValue = this.user.email;
  }

  onPasswordNo() {
    this.passwordEditMode = !this.passwordEditMode;
    this.password.reset();
    this.passwordTwo.reset();
    this.password.setValue(this.passwordValue);
    this.passwordValue = '*******';
  }

  onEmailYes() {
    if (this.email.valid) {
      this.onSubmit();
      this.emailEditMode = !this.emailEditMode;
    }
  }

  onPasswordYes() {
    this.passwordValue = '*******';

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
