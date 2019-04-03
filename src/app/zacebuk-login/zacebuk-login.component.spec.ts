import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZacebukLoginComponent } from './zacebuk-login.component';

describe('ZacebukLoginComponent', () => {
  let component: ZacebukLoginComponent;
  let fixture: ComponentFixture<ZacebukLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZacebukLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZacebukLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
