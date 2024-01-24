import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrendingPlanComponent } from './trending-plan.component';

describe('TrendingPlanComponent', () => {
  let component: TrendingPlanComponent;
  let fixture: ComponentFixture<TrendingPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrendingPlanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrendingPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
