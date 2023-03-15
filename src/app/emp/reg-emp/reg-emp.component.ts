import { Component } from '@angular/core';
import { Position } from '../employee.model';
import { NgForm } from '@angular/forms';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-reg-emp',
  templateUrl: './reg-emp.component.html',
  styleUrls: ['./reg-emp.component.css']
})
export class RegEmpComponent {
  readonly Positions = Object.keys(Position).filter(x => !isNaN(Number(x)));
  readonly Departments = Object.keys(this.employeeService.getDeptList());
  readonly objGetVal = Object.values;
  constructor(public employeeService: EmployeeService){}

  getVal(key: any){
    return Position[key as keyof typeof Position];
  }

  getDeptVal(key : any){
    return this.employeeService.getDeptList()[key];
  }
  getDeptValString(key: any){
    return this.employeeService.getDeptList()[key].deptID + " : "
    + this.employeeService.getDeptList()[key].deptName;
  }
  onEmpReg(form: NgForm){
    if (form.invalid){
      return;
    }
    this.employeeService.addEmp(form.value.empID, form.value.name, form.value.deptID, form.value.position, form.value.email,
       form.value.supID)
  }
}
