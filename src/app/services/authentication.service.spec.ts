import {AuthenticationService} from './authentication.service';
import {Http, HttpModule, RequestOptions, ResponseOptions, XHRBackend, Response, ResponseType} from '@angular/http';
import {MockBackend, MockConnection} from '@angular/http/testing';
import {Observable} from 'rxjs/Observable';
import {User} from '../models/user.model';
import Spy = jasmine.Spy;
import {inject, TestBed} from '@angular/core/testing';

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

describe('AuthenticationService with test bed', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        AuthenticationService,
        {provide: XHRBackend, useClass: MockBackend}
      ]
    });
  });

  describe('userById /GET', () => {

    // So.. we inject the authService and mockBackend set up in the test bed into this test

    it('should return an observable containing user data',
      inject([AuthenticationService, XHRBackend], (authService, mockBackend) => {

        // Create mock data
        const mockResponse = {
          email: 'test@tester',
          firstName: 'test',
          secondName: 'tester'
        };

        const spy = spyOn(authService, 'getJwt').and.returnValue('12345');

        // Set the mock backend to respond with the mock data
        mockBackend.connections.subscribe((connection: MockConnection) => {
          connection.mockRespond(new Response(new ResponseOptions({
            body: JSON.stringify(mockResponse)
          })));
        });

        authService.getUserById('123').subscribe((user) => {
          expect(spy).toHaveBeenCalled();
          expect(user.firstName).toEqual('test');
          expect(user.secondName).toEqual('tester');
          expect(user.email).toEqual('test@tester');
        });

      }));
  });

  describe('getUser', () => {

    it(`if user is null, and isLoggedIn is true
       then getUserById should be called and if successful
        then user should be set
         and userChanged should receive user as next`,
      inject([AuthenticationService, XHRBackend], (authService, mockBackend) => {

        // Set user to null and isLoggedIn() returns true
        authService.user = null;
        const loggedInSpy: Spy = spyOn(authService, 'isLoggedIn').and.returnValue(true);

        // Create a spy for getJwt that returns 123, as is needed by getUserById
        const jwtSpy = spyOn(authService, 'getJwt').and.returnValue('123');

        // Create response user data
        const userData = {
          email: 'test@tester',
          firstName: 'test',
          secondName: 'tester'
        };

        // Set getUserByID to respond with the user data
        mockBackend.connections.subscribe((connection: MockConnection) => {
          connection.mockRespond(new Response(new ResponseOptions({
            body: JSON.stringify(userData)
          })));
        });

        // Setup a temp user and subscribe to userChanged to see if it gets updated
        let tempUser: User;
        authService.userChanged.subscribe((user: User) => {
          tempUser = user;
        });

        // Expected user to be set
        const expectedUser: User = new User();
        expectedUser.firstName = 'test';
        expectedUser.secondName = 'tester';
        expectedUser.email = 'test@tester';

        // Act
        authService.getUser();

        // Assert
        expect(authService.user).toEqual(expectedUser);
        expect(tempUser).toEqual(expectedUser);
        expect(jwtSpy).toHaveBeenCalled();
        expect(loggedInSpy).toHaveBeenCalled();
      }));

    it('should emit user if isLoggedIn true and user not null',
      inject([AuthenticationService, XHRBackend], (authService, mockBackend) => {

        const isLoggedInSpy: Spy = spyOn(authService, 'isLoggedIn').and.returnValue(true);

        const testUser: User = new User();
        testUser.firstName = 'test';
        testUser.secondName = 'tester';
        testUser.email = 'test@tester';

        authService.user = testUser;

        // Setup a temp user and subscribe to userChanged to see if it gets updated
        let tempUser: User;
        authService.userChanged.subscribe((user: User) => {
          tempUser = user;
        });

        authService.getUser();

        expect(isLoggedInSpy).toHaveBeenCalled();
        expect(tempUser).toEqual(testUser);

    }));

    it('should console log "Not logged in" if isLoggedIn false',
      inject([AuthenticationService, XHRBackend], (authService, mockBackend) => {

        const isLoggedInSpy: Spy = spyOn(authService, 'isLoggedIn').and.returnValue(false);
        const consoleLogSpy: Spy = spyOn(console, 'log');
        authService.user = null;

        authService.getUser();
        expect(isLoggedInSpy).toHaveBeenCalled();
        expect(consoleLogSpy).toHaveBeenCalledWith('Not logged in');

      }));
  });

  describe('register /POST', () => {
    it('should return an observable with posted data',
      inject([AuthenticationService, XHRBackend], (authService, mockBackend) => {

        const postedData =  {
          email: 'test@tester',
          password: 'tester'
        };

        // Set posted data to be returned
        mockBackend.connections.subscribe((connection: MockConnection) => {
          connection.mockRespond(new Response(new ResponseOptions({
            body: JSON.stringify(postedData)
          })));
        });

        // Subscribe to register verifying it returns an Observable, and checking the data is correct
        authService.register().subscribe((responseData) => {
          expect(responseData.email).toEqual('test@tester');
          expect(responseData.password).toEqual('tester');
        });
      }));

    it('should throw an an observable error if request returns error',
      inject([AuthenticationService, XHRBackend], (authService, mockBackend) => {

        class MockError extends Response implements Error {
          name: any;
          message: any;
        }

        const body = JSON.stringify({ message: 'Registration Failed' });

        // Set post to return error
        mockBackend.connections.subscribe((connection: MockConnection) => {
          connection.mockError(new MockError(new ResponseOptions({type: ResponseType.Error, status: 404, body: body})));
        });

        authService.register().subscribe(
          data => expect(false).toBeTruthy(),
          err => expect(err.message).toBe('Registration Failed')
        );
    }));
  });

  describe('signIn /POST', () => {
    it('should return an observable with posted data',
      inject([AuthenticationService, XHRBackend], (authService, mockBackend) => {

        const postedData =  {
          email: 'test@tester',
          password: 'tester'
        };

        // Set posted data to be returned
        mockBackend.connections.subscribe((connection: MockConnection) => {
          connection.mockRespond(new Response(new ResponseOptions({
            body: JSON.stringify(postedData)
          })));
        });

        // Subscribe to register verifying it returns an Observable, and checking the data is correct
        authService.signIn().subscribe((responseData) => {
          expect(responseData.email).toEqual('test@tester');
          expect(responseData.password).toEqual('tester');
        });
      }));

    it('should throw an an observable error if request returns error',
      inject([AuthenticationService, XHRBackend], (authService, mockBackend) => {

        class MockError extends Response implements Error {
          name: any;
          message: any;
        }

        const body = JSON.stringify({message: 'Registration Failed'});

        // Set post to return error
        mockBackend.connections.subscribe((connection: MockConnection) => {
          connection.mockError(new MockError(new ResponseOptions({type: ResponseType.Error, status: 404, body: body})));
        });

        authService.signIn().subscribe(
          data => expect(false).toBeTruthy(),
          err => expect(err.message).toBe('Registration Failed')
        );
      }));
  });
});
