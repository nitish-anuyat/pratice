import { TestBed } from '@angular/core/testing';

import { MyPlansService } from './my-plans.service';

describe('MyPlansService', () => {
  let service: MyPlansService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyPlansService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
