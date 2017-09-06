import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from "../../models/user.model";
import {AuthenticationService} from "../../services/authentication.service";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  user: User = new User();
  userSub: Subscription;

  constructor(private authService: AuthenticationService) { }

  ngOnInit() {

    // Subscribes to user
    this.userSub = this.authService.userChanged
      .subscribe(
        (user) => {
          let newUser = new User();
          newUser.email = user.email;
          newUser.firstName = user.firstName;
          newUser.secondName = user.secondName;
          this.user = newUser;
        }
      );

    // Asks the auth service to emit user or fetch and emit user
    this.authService.getUser();
  }

  ngOnDestroy() {
    // Manually un-subscribe
    this.userSub.unsubscribe();
  }

  // todo make frontend and backend variable names match, thisVar instead of this_var
  // todo remove User fields from constructor so we don't have to keep providing dummy Password
}

