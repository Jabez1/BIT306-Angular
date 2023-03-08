import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDailyScheduleComponent } from './update-daily-schedule.component';

describe('UpdateDailyScheduleComponent', () => {
  let component: UpdateDailyScheduleComponent;
  let fixture: ComponentFixture<UpdateDailyScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateDailyScheduleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateDailyScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
