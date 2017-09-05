import {User} from "../models/user.model";
import {Injectable} from "@angular/core";
import {Headers, Http, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";
import "rxjs/Rx";

@Injectable()
export class AuthenticationService {
  private user: User = null;

  constructor(private http: Http) {}

  register(user: User) {
    const body = JSON.stringify(user);

    let headers = new Headers({'Content-Type': 'application/json'});
    headers.append("Accept", "application/json");

    return this.http.post('http://localhost:8080/users', body, {headers: headers})
      .map((response: Response) => response.json())
      .catch((err: Response) => Observable.throw(err.json()));
  }

  signIn(user: User) {
    const body = JSON.stringify(user);

    let headers = new Headers({'Content-Type': 'application/json'});
    headers.append("Accept", "application/json");

    return this.http.post('http://localhost:8080/users/signin', body, {headers: headers})
      .map((response: Response) => response.json())
      .catch((err: Response) => Observable.throw(err.json()));
  }

  logout() {
    localStorage.clear()
  }

  setUser(user: User) {
    this.user = user;
  }

  isLoggedIn() {
    return localStorage.getItem('jwt') !== null;
  }

  getUser() {
    return this.user
  }
}
