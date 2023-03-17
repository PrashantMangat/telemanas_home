import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeMapInfoComponent } from './home-map-info.component';

describe('HomeMapInfoComponent', () => {
  let component: HomeMapInfoComponent;
  let fixture: ComponentFixture<HomeMapInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeMapInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeMapInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
