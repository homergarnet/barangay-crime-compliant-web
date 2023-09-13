import { TestBed } from '@angular/core/testing';

import { AdminIncidentReportService } from './admin-incident-report.service';

describe('AdminIncidentReportService', () => {
  let service: AdminIncidentReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminIncidentReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
