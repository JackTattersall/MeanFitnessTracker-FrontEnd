import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../../services/authentication.service";

@Component({
  selector: 'app-register-email-sent',
  templateUrl: './register-email-sent.component.html',
  styleUrls: ['./register-email-sent.component.css']
})
export class RegisterEmailSentComponent implements OnInit {
  userName: string;

  constructor(private authService: AuthenticationService) { }

  ngOnInit() {
    if (this.authService.getUser()) {
      this.userName = this.authService.getUser().first_name;
    }
  }

}
