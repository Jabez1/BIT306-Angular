import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevEmpScheduleComponent } from './rev-emp-schedule.component';

describe('RevEmpScheduleComponent', () => {
  let component: RevEmpScheduleComponent;
  let fixture: ComponentFixture<RevEmpScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RevEmpScheduleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RevEmpScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
