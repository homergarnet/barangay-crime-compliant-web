import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCrimeComponent } from './manage-crime.component';

describe('ManageCrimeComponent', () => {
  let component: ManageCrimeComponent;
  let fixture: ComponentFixture<ManageCrimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageCrimeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageCrimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
