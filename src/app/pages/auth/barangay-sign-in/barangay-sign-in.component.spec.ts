import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarangaySignInComponent } from './barangay-sign-in.component';

describe('BarangaySignInComponent', () => {
  let component: BarangaySignInComponent;
  let fixture: ComponentFixture<BarangaySignInComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BarangaySignInComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BarangaySignInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
