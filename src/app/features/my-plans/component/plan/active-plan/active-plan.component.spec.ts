import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivePlanComponent } from './active-plan.component';

describe('ActivePlanComponent', () => {
  let component: ActivePlanComponent;
  let fixture: ComponentFixture<ActivePlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivePlanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivePlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
