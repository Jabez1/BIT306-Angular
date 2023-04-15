import { Component } from '@angular/core';
import { WorkHours } from '../emp-schedule.model';
import { Subscription } from 'rxjs';
import { DailySchedule } from '../emp-schedule.model';



@Component({
  selector: 'app-rev-emp-schedule',
  templateUrl: './rev-emp-schedule.component.html',
  styleUrls: ['./rev-emp-schedule.component.css']
})
export class RevEmpScheduleComponent {
  readonly WorkHours = WorkHours;
  private empSchedList: Subscription | undefined;

  objValues = Object.values;
  objKeys = Object.keys;

  empSched: DailySchedule[] = [];

  groupedEmpWorkHours: any = [];

  

}
