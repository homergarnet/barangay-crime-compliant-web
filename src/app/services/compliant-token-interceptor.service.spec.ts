import { TestBed } from '@angular/core/testing';

import { CompliantTokenInterceptorService } from './compliant-token-interceptor.service';

describe('CompliantTokenInterceptorService', () => {
  let service: CompliantTokenInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompliantTokenInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
