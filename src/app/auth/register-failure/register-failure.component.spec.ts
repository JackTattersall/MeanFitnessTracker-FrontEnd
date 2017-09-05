import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterFailureComponent } from './register-failure.component';

describe('RegisterFailureComponent', () => {
  let component: RegisterFailureComponent;
  let fixture: ComponentFixture<RegisterFailureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterFailureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterFailureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
