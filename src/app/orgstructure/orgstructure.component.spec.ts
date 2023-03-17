import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgstructureComponent } from './orgstructure.component';

describe('OrgstructureComponent', () => {
  let component: OrgstructureComponent;
  let fixture: ComponentFixture<OrgstructureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrgstructureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgstructureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
