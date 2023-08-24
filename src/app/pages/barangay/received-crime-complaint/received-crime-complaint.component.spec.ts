import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceivedCrimeComplaintComponent } from './received-crime-complaint.component';

describe('ReceivedCrimeComplaintComponent', () => {
  let component: ReceivedCrimeComplaintComponent;
  let fixture: ComponentFixture<ReceivedCrimeComplaintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReceivedCrimeComplaintComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReceivedCrimeComplaintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
