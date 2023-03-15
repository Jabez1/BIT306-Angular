import { Component } from '@angular/core';
import { FWAService } from '../fwa.service';
import { FWA, Status, WorkType } from "../fwa.model";
import { EmployeeService } from 'src/app/emp/employee.service';
import { Employee } from 'src/app/emp/employee.model';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-fwaview',
  templateUrl: './fwaview.component.html',
  styleUrls: ['./fwaview.component.css']
})
export class FwaViewComponent {
  readonly Status = Status;
  readonly WorkType = WorkType;
  readonly empList = this.employeeService.getEmpList();
  readonly groupedFWAList = this.fwaService.getGroupedFWAList();
  readonly groupedFWAListWorkType = this.fwaService.getGroupedFWAListWorkType();

  objKeys = Object.keys;
  getVal(key : any){
    return this.groupedFWAList[key];
  }
  getCount(key : any){
  return this.groupedFWAListWorkType[key as WorkType].length;
  }
  objValues = Object.values;



  enumVal(enumKey: string) {
    return WorkType[enumKey as keyof typeof WorkType];
   }

  fwaList: FWA[] = [];
  constructor(
    public fwaService: FWAService,
    public employeeService: EmployeeService){

  }

  ngOnInit(){
    this.fwaList= this.fwaService.getFWAList();
  }
}
