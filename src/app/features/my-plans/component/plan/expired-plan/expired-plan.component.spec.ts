import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpiredPlanComponent } from './expired-plan.component';

describe('ExpiredPlanComponent', () => {
  let component: ExpiredPlanComponent;
  let fixture: ComponentFixture<ExpiredPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpiredPlanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpiredPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
