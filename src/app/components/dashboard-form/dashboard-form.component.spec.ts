import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardFormComponent } from './dashboard-form.component';

describe('DashboardFormComponent', () => {
  let component: DashboardFormComponent;
  let fixture: ComponentFixture<DashboardFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form visibility works', () => {
    expect(component.displayContent).toEqual(false);
    component.formVisibility();
    expect(component.displayContent).toEqual(true);
    component.formVisibility();
    expect(component.displayContent).toEqual(false);
  });
});
