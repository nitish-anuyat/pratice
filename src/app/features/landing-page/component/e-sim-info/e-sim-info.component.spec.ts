import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ESimInfoComponent } from './e-sim-info.component';

describe('ESimInfoComponent', () => {
  let component: ESimInfoComponent;
  let fixture: ComponentFixture<ESimInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ESimInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ESimInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
