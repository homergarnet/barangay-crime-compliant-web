import { TestBed } from '@angular/core/testing';

import { BarangayDashboardService } from './barangay-dashboard.service';

describe('BarangayDashboardService', () => {
  let service: BarangayDashboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BarangayDashboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
