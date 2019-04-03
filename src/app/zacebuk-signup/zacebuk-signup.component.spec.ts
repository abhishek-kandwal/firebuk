import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZacebukSignupComponent } from './zacebuk-signup.component';

describe('ZacebukSignupComponent', () => {
  let component: ZacebukSignupComponent;
  let fixture: ComponentFixture<ZacebukSignupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZacebukSignupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZacebukSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
