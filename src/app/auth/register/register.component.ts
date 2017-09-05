import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../../services/authentication.service";
import {User} from "../../models/user.model";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(
    private authService: AuthenticationService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.initForm()
  }

  onSubmit() {
    console.log(this.registerForm.value);
    console.log(this.registerForm.status);
    console.log(this.registerForm.get('firstName').value);

    if (this.registerForm.valid && this.passwordsMatch()) {
      const user = new User(
        this.registerForm.get('email').value,
        this.registerForm.get('passwordOne').value,
        this.registerForm.get('firstName').value,
        this.registerForm.get('secondName').value,
        false
      );

      this.authService.register(user).subscribe(
        data => {
          this.authService.setUser(user);
          this.router.navigate(['sent'], {relativeTo: this.route})
        },
        err => this.registerForm.reset()
      );

    }
  }

  private initForm() {
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

  private passwordsMatch() {
    return (
      this.registerForm.get('passwordOne').value ===
      this.registerForm.get('passwordTwo').value
    )
  }

  get firstName() { return this.registerForm.get('firstName'); }

  get secondName() { return this.registerForm.get('secondName'); }

  get email() { return this.registerForm.get('email'); }

  get passwordOne() { return this.registerForm.get('passwordOne'); }

  get passwordTwo() { return this.registerForm.get('passwordTwo'); }

}
