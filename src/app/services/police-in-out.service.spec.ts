import { TestBed } from '@angular/core/testing';

import { PoliceInOutService } from './police-in-out.service';

describe('PoliceInOutService', () => {
  let service: PoliceInOutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PoliceInOutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
