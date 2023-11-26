import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoliceInOutComponent } from './police-in-out.component';

describe('PoliceInOutComponent', () => {
  let component: PoliceInOutComponent;
  let fixture: ComponentFixture<PoliceInOutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PoliceInOutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PoliceInOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
