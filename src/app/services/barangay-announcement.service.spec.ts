import { TestBed } from '@angular/core/testing';

import { BarangayAnnouncementService } from './barangay-announcement.service';

describe('BarangayAnnouncementService', () => {
  let service: BarangayAnnouncementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BarangayAnnouncementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
