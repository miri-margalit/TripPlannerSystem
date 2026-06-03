import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTrips } from './admin-trips';

describe('AdminTrips', () => {
  let component: AdminTrips;
  let fixture: ComponentFixture<AdminTrips>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminTrips],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminTrips);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
