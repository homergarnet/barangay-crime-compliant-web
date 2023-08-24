import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolvedCompletedReportsComponent } from './solved-completed-reports.component';

describe('SolvedCompletedReportsComponent', () => {
  let component: SolvedCompletedReportsComponent;
  let fixture: ComponentFixture<SolvedCompletedReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolvedCompletedReportsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SolvedCompletedReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
