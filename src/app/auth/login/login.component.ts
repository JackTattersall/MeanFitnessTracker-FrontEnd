import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService} from "../../services/authentication.service";
import {User} from "../../models/user.model";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private authService: AuthenticationService,
              private formBuilder: FormBuilder,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.initForm()
  }

  onSubmit() {
    const user = new User();
    user.email = this.email.value;
    user.password = this.password.value;

    this.authService.signIn(user)
      .subscribe(
        data => {
          localStorage.setItem('jwt', data.jwt);
          localStorage.setItem('userId', data.userId);

          let newUser = new User();
          newUser.email = data.email;
          newUser.firstName = data.firstName;
          newUser.secondName = data.secondName;
          this.authService.setUser(newUser);

          this.router.navigate(['/'], {relativeTo: this.route});
        },
        err => {
          this.loginForm.reset();
          console.error(err)
        }
      )
  }

  initForm() {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required]
    });
  }

  get email() { return this.loginForm.get('email') }
  get password() { return this.loginForm.get('password') }

}
