import { TestBed } from '@angular/core/testing';

import { BarangayGuardsGuard } from './barangay-guards.guard';

describe('BarangayGuardsGuard', () => {
  let guard: BarangayGuardsGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(BarangayGuardsGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
