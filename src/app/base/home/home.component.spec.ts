import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import {AuthenticationService} from "../../services/authentication.service";
import {TitalisePipe} from "../../shared/pipes/titalise.pipe";
import {Subject} from "rxjs/Subject";

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  const mockAuth = {
    userChanged: new Subject(),
    getUser: jasmine.createSpy('getUser')
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TitalisePipe, HomeComponent ],
      providers: [
        {provide: AuthenticationService, useValue: mockAuth}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
