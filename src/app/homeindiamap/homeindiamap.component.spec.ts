import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeindiamapComponent } from './homeindiamap.component';

describe('HomeindiamapComponent', () => {
  let component: HomeindiamapComponent;
  let fixture: ComponentFixture<HomeindiamapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeindiamapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeindiamapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
