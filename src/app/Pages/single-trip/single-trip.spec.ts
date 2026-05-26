import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleTrip } from './single-trip';

describe('SingleTrip', () => {
  let component: SingleTrip;
  let fixture: ComponentFixture<SingleTrip>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingleTrip],
    }).compileComponents();

    fixture = TestBed.createComponent(SingleTrip);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
