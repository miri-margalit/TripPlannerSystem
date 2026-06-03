import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTripCard } from './admin-trip-card';

describe('AdminTripCard', () => {
  let component: AdminTripCard;
  let fixture: ComponentFixture<AdminTripCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminTripCard],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminTripCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
