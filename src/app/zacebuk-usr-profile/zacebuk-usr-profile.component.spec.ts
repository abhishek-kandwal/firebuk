import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZacebukUsrProfileComponent } from './zacebuk-usr-profile.component';

describe('ZacebukUsrProfileComponent', () => {
  let component: ZacebukUsrProfileComponent;
  let fixture: ComponentFixture<ZacebukUsrProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZacebukUsrProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZacebukUsrProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
