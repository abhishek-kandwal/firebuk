import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZacebukWallComponent } from './zacebuk-wall.component';

describe('ZacebukWallComponent', () => {
  let component: ZacebukWallComponent;
  let fixture: ComponentFixture<ZacebukWallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZacebukWallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZacebukWallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
