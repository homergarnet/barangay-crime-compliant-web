import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrimeMappingComponent } from './crime-mapping.component';

describe('CrimeMappingComponent', () => {
  let component: CrimeMappingComponent;
  let fixture: ComponentFixture<CrimeMappingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrimeMappingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrimeMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
