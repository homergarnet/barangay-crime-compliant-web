import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LawAndOrderInformationComponent } from './law-and-order-information.component';

describe('LawAndOrderInformationComponent', () => {
  let component: LawAndOrderInformationComponent;
  let fixture: ComponentFixture<LawAndOrderInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LawAndOrderInformationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LawAndOrderInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
