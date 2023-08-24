import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationAlertComponent } from './location-alert.component';

describe('LocationAlertComponent', () => {
  let component: LocationAlertComponent;
  let fixture: ComponentFixture<LocationAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocationAlertComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocationAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
