import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZacebukPostComponent } from './zacebuk-post.component';

describe('ZacebukPostComponent', () => {
  let component: ZacebukPostComponent;
  let fixture: ComponentFixture<ZacebukPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZacebukPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZacebukPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
