import { Component } from '@angular/core';
import { Position } from '../employee.model';
import { NgForm } from '@angular/forms';
import { AuthService } from "../auth-service";

@Component({
  selector: 'app-reg-emp',
  templateUrl: './reg-emp.component.html',
  styleUrls: ['./reg-emp.component.css']
})
export class RegEmpComponent {
  //Filters the Position Enum for a list of Position Names
  readonly Positions = Object.keys(Position).filter(x => !isNaN(Number(x)));
  readonly Departments = Object.keys(this.authService.getDeptList());
  readonly objGetVal = Object.values;
  constructor( public authService: AuthService){}

  getVal(key: any){
    return Position[key as keyof typeof Position];
  }

  getDeptVal(key : any){
    return this.authService.getDeptList()[key];
  }
  getDeptValString(key: any){
    return this.authService.getDeptList()[key].deptID + " : "
    + this.authService.getDeptList()[key].deptName;
  }

  onEmpReg(form: NgForm){
    if (form.invalid){
      return;
    }
    // this.employeeService.addEmp(form.value.empID, form.value.name, form.value.deptID, form.value.position, form.value.email,
    //   form.value.supID);
    this.authService.createEmployee(form.value.empID, form.value.name, form.value.deptID.deptID, form.value.position,
      form.value.email,
      form.value.supID);
  }
}
