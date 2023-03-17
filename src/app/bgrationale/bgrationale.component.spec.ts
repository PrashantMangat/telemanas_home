import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BgrationaleComponent } from './bgrationale.component';

describe('BgrationaleComponent', () => {
  let component: BgrationaleComponent;
  let fixture: ComponentFixture<BgrationaleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BgrationaleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BgrationaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
