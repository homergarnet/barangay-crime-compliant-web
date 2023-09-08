import { TestBed } from '@angular/core/testing';

import { BarangayReportsService } from './barangay-reports.service';

describe('BarangayReportsService', () => {
  let service: BarangayReportsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BarangayReportsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
