import { TestBed } from '@angular/core/testing';

import { ReceiveCompliantService } from './receive-compliant.service';

describe('ReceiveCompliantService', () => {
  let service: ReceiveCompliantService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReceiveCompliantService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
