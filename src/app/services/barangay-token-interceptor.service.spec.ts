import { TestBed } from '@angular/core/testing';

import { BarangayTokenInterceptorService } from './barangay-token-interceptor.service';

describe('BarangayTokenInterceptorService', () => {
  let service: BarangayTokenInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BarangayTokenInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
