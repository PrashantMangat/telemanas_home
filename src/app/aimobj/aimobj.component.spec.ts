import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AimobjComponent } from './aimobj.component';

describe('AimobjComponent', () => {
  let component: AimobjComponent;
  let fixture: ComponentFixture<AimobjComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AimobjComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AimobjComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
