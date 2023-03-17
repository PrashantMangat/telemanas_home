import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IECPromotionalMaterialComponent } from './iecpromotional-material.component';

describe('IECPromotionalMaterialComponent', () => {
  let component: IECPromotionalMaterialComponent;
  let fixture: ComponentFixture<IECPromotionalMaterialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IECPromotionalMaterialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IECPromotionalMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
