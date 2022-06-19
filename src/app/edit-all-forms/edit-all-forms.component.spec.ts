import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAllFormsComponent } from './edit-all-forms.component';

describe('EditAllFormsComponent', () => {
  let component: EditAllFormsComponent;
  let fixture: ComponentFixture<EditAllFormsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAllFormsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAllFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
