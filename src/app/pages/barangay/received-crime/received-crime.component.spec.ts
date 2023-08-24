import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceivedCrimeComponent } from './received-crime.component';

describe('ReceivedCrimeComponent', () => {
  let component: ReceivedCrimeComponent;
  let fixture: ComponentFixture<ReceivedCrimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReceivedCrimeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReceivedCrimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
