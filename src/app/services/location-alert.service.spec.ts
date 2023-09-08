import { TestBed } from '@angular/core/testing';

import { LocationAlertService } from './location-alert.service';

describe('LocationAlertService', () => {
  let service: LocationAlertService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocationAlertService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
