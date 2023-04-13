import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EmployeeService } from '../employee.service';
import { Employee, Status, Position} from '../employee.model';
import { AuthService } from "../auth-service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(public employeeService: EmployeeService, public authService: AuthService){}


  login(form : NgForm){
    const emp = this.authService.login(form.value.empID, form.value.password);
    if(form.invalid){
      return;
    }
    if(emp == undefined ){
      return;
    }
    // else if(emp.Status == Status.NEW){
    //   this.openDialog();
    // }
    else{
      this.employeeService.routeEmp(emp);
    }
  }


}
