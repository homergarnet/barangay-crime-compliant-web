import { TestBed } from '@angular/core/testing';

import { SolvedCompletedReportsService } from './solved-completed-reports.service';

describe('SolvedCompletedReportsService', () => {
  let service: SolvedCompletedReportsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SolvedCompletedReportsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
