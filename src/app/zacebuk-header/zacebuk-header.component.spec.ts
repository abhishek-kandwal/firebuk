import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZacebukHeaderComponent } from './zacebuk-header.component';

describe('ZacebukHeaderComponent', () => {
  let component: ZacebukHeaderComponent;
  let fixture: ComponentFixture<ZacebukHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZacebukHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZacebukHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
