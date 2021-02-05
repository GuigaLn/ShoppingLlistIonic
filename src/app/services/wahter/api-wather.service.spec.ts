import { TestBed } from '@angular/core/testing';

import { ApiWatherService } from './api-wather.service';

describe('ApiWatherService', () => {
  let service: ApiWatherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiWatherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
