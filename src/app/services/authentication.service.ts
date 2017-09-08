import {User} from '../models/user.model';
import {Injectable} from '@angular/core';
import {Headers, Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import {environment} from '../../environments/environment';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class AuthenticationService {
  userChanged = new Subject<User>();
  private user: User = null;

  private headers = new Headers({
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  });

  constructor(private http: Http) {
  }

  // Registers a new user returns an Observable
  register(user: User) {
    const body = JSON.stringify(user);

    return this.http.post(environment.apiUrl + '/users', body, {headers: this.headers})
      .map((response: Response) => response.json())
      .catch((err: Response) => Observable.throw(err.json()));
  }

  // Signs in a user returns an observable
  signIn(user: User) {
    const body = JSON.stringify(user);

    return this.http.post(environment.apiUrl + '/users/signin', body, {headers: this.headers})
      .map((response: Response) => response.json())
      .catch((err: Response) => Observable.throw(err.json()));
  }

  // Gets a user returns an observable
  getUserById(id: string) {
    const getRequestHeaders = this.headers;
    getRequestHeaders.append('jwt', this.getJwt());

    return this.http.get(environment.apiUrl + '/users/' + id, {headers: getRequestHeaders})
      .map((response: Response) =>  response.json())
      .catch((err: Response) => Observable.throw(err.json()));
  }

  // Logs a user out
  logout() {
    localStorage.clear();
  }

  // Sets this user and emits the next subscription
  setUser(user: User) {
    this.user = user;
    this.userChanged.next(this.user);
  }

  // Returns true if logged in
  isLoggedIn() {
    return this.getJwt() !== null && this.getUserId() !== null;
  }

  // Will return this user, or if user null (a la page refresh), re-fetches user
  getUser() {
    if (this.isLoggedIn()) {

      if (this.user === null) {

        this.getUserById(this.getUserId())
          .subscribe(
            data => {
              const newUser = new User();
              newUser.firstName = data.firstName;
              newUser.email = data.email;
              newUser.secondName = data.secondName;

              this.user = newUser;
              this.userChanged.next(this.user);
            },
            err => console.error('no user')
          );

      } else {
        this.userChanged.next(this.user);
      }

    } else {
      console.log('Not logged in');
    }
  }

  // Get the current jwt token stored
  getJwt() {
    return localStorage.getItem('jwt');
  }

  // Get the current user id stored
  getUserId() {
    return localStorage.getItem('userId');
  }

  get currentUser() {
    return this.user;
  }
}
