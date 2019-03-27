import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZacebukFooterComponent } from './zacebuk-footer.component';

describe('ZacebukFooterComponent', () => {
  let component: ZacebukFooterComponent;
  let fixture: ComponentFixture<ZacebukFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZacebukFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZacebukFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
