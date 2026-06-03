import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEditForm } from './admin-edit-form';

describe('AdminEditForm', () => {
  let component: AdminEditForm;
  let fixture: ComponentFixture<AdminEditForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminEditForm],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminEditForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
