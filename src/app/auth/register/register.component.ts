import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../../services/authentication.service';
import {User} from '../../models/user.model';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  emailUnique = true;

  constructor(
    private authService: AuthenticationService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.initForm();
  }

  onSubmit() {

    if (this.registerForm.valid && this.passwordsMatch()) {
      const newUser = new User();
      newUser.email = this.registerForm.get('email').value;
      newUser.firstName = this.registerForm.get('firstName').value;
      newUser.secondName = this.registerForm.get('secondName').value;
      newUser.password = this.registerForm.get('passwordOne').value;
      newUser.isVerified = false;

      this.authService.register(newUser).subscribe(
        data => {
          this.authService.setUser(newUser);
          this.router.navigate(['sent'], {relativeTo: this.route});
        },
        err => {
          if (err.message === 'Account with this email already exists') {
            this.emailNotUnique();
          } else {
            this.registerForm.reset();
          }
        }
      );
    }
  }

  initForm() {
    this.registerForm = this.formBuilder.group({
      firstName: [null, Validators.required],
      secondName: [null, Validators.required],
      email: [
        null,
        [ Validators.required, Validators.email]
      ],
      passwordOne: [
        null,
        [ Validators.required, Validators.minLength(6) ]
      ],
      passwordTwo: [
        null,
        [ Validators.required, Validators.minLength(6) ]
      ]
    });
  }

  passwordsMatch() {
    return (
      this.registerForm.get('passwordOne').value ===
      this.registerForm.get('passwordTwo').value
    );
  }

  get firstName() { return this.registerForm.get('firstName'); }

  get secondName() { return this.registerForm.get('secondName'); }

  get email() { return this.registerForm.get('email'); }

  get passwordOne() { return this.registerForm.get('passwordOne'); }

  get passwordTwo() { return this.registerForm.get('passwordTwo'); }

  emailNotUnique() {
    this.email.setValue('');
    this.emailUnique = false;
  }

}
