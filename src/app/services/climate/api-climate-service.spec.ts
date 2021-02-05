import { TestBed } from '@angular/core/testing';

import { ApiClimateService } from './api-climate-service';

describe('ApiClimateService', () => {
  let service: ApiClimateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiClimateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
