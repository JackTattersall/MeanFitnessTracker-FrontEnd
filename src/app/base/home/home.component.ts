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
  user: User = new User('', '', '', '');
  userSub: Subscription;

  constructor(private authService: AuthenticationService) { }

  ngOnInit() {

    // Subscribes to user
    this.userSub = this.authService.userChanged
      .subscribe(
        (user) => {
          this.user = new User(user.email, '******', user.first_name, user.second_name);
        }
      );

    // Asks the auth service to emit user or fetch and emit user
    this.authService.getUser();
  }

  ngOnDestroy() {
    // Manually un-subscribe
    this.userSub.unsubscribe();
  }
}

