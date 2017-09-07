import {AuthenticationService} from './authentication.service';
import {Http, RequestOptions} from '@angular/http';
import {MockBackend} from '@angular/http/testing';
import {Observable} from 'rxjs/Observable';
import {User} from '../models/user.model';
import Spy = jasmine.Spy;

describe('AuthenticationService without the TestBed', () => {
  let service: AuthenticationService;

  const mockHttp = new Http(new MockBackend(), new RequestOptions());
  const mockUser = {
    firstName: 'test',
    secondName: 'tester',
    email: 'test@tester',
  };

  let getSpy: Spy;
  let postSpy: Spy;

  // Observable.create(() => { return mockUser; })

  beforeEach(() => {
    getSpy = spyOn(mockHttp, 'get').and.returnValue(Observable.of(mockUser));
    postSpy = spyOn(mockHttp, 'post').and.returnValue(Observable.of(mockUser));
    service = new AuthenticationService(mockHttp);
  });


  it('register should send post request', () => {
    const user = new User();
    user.firstName = 'lo';
    service.register(user);
    expect(postSpy).toHaveBeenCalled();
    expect(postSpy).toHaveBeenCalledWith('http://localhost:8080/users', '{"firstName":"lo"}', jasmine.any(Object));
  });

  it('signIn should send post request', () => {
    const user = new User();
    user.firstName = 'lo';
    service.signIn(user);
    expect(postSpy).toHaveBeenCalled();
    expect(postSpy).toHaveBeenCalledWith('http://localhost:8080/users/signin', '{"firstName":"lo"}', jasmine.any(Object));
  });

  it('getUserByID should send get request', () => {
    service.getUserById('12west');
    expect(getSpy).toHaveBeenCalled();
    expect(getSpy).toHaveBeenCalledWith('http://localhost:8080/users/12west', jasmine.any(Object));
  });

  it('setUser should initialize user and also emit next fro userChanged', () => {
    const user = new User();
    user.firstName = 'test';
    let subUser: User;

    service.userChanged.subscribe(
      data => subUser = data
    );

    expect(service.currentUser).toEqual(null);

    service.setUser(user);

    expect(service.currentUser).toEqual(user);
    expect(subUser).toEqual(user);
  });

  it('get user should fetch user from backend if user is null and isLoggedIn is true', () => {
    const isLoggedInSpy = spyOn(service, 'isLoggedIn').and.returnValue(true);
    const userIdSpy = spyOn(service, 'getUserId').and.returnValue(1234);
    expect(service.currentUser).toEqual(null);

    const userExpected = new User();
    userExpected.firstName = 'test';
    userExpected.secondName = 'tester';
    userExpected.email = 'test@tester';

    service.getUser();

    expect(getSpy).toHaveBeenCalled();
    expect(userIdSpy).toHaveBeenCalled();
    expect(isLoggedInSpy).toHaveBeenCalled();
  });

  it('logout should clear local storage', () => {
    service.logout();

    expect(localStorage.length).toBe(0);
  });

  it('isLoggedIn should return true only if jwt and userId exist in localStorage', () => {
    localStorage.clear();

    expect(service.isLoggedIn()).toBeFalsy();

    localStorage.setItem('jwt', 'key');

    expect(service.isLoggedIn()).toBeFalsy();

    localStorage.setItem('userId', '1234');

    expect(service.isLoggedIn()).toBeTruthy();
  });

});
