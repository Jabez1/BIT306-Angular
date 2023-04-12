import { Component } from '@angular/core';
import { WorkHours } from '../emp-schedule.model';
import { NgForm } from '@angular/forms';
import { EmpScheduleService } from '../emp-schedule.service';

@Component({
  selector: 'app-update-daily-schedule',
  templateUrl: './update-daily-schedule.component.html',
  styleUrls: ['./update-daily-schedule.component.css']
})
export class UpdateDailyScheduleComponent {
  readonly WorkHours = WorkHours;
  readonly WorkHoursKeys = Object.keys(WorkHours);
  EmpScheduleService: any;

  getVal(key: any){
    return WorkHours[key as keyof typeof WorkHours];
  }

  onEMPSubmit(form: NgForm){
    if (form.invalid){
      return;
    }
    this.EmpScheduleService.addEmpSchedule(form.value.workHours,form.value.workLocation,form.value.workReport)
  }


}
