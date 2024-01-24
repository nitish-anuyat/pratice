import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpcomingPlanComponent } from './upcoming-plan.component';

describe('UpcomingPlanComponent', () => {
  let component: UpcomingPlanComponent;
  let fixture: ComponentFixture<UpcomingPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpcomingPlanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpcomingPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
