import { TestBed } from '@angular/core/testing';

import { CompliantGuardsGuard } from './compliant-guards.guard';

describe('CompliantGuardsGuard', () => {
  let guard: CompliantGuardsGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CompliantGuardsGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
