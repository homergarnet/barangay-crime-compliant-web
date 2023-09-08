import { TestBed } from '@angular/core/testing';

import { ReceiveCrimeService } from './receive-crime.service';

describe('ReceiveCrimeService', () => {
  let service: ReceiveCrimeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReceiveCrimeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
