import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(public employeeService: EmployeeService){}

  login(form : NgForm){
    console.log(form.value.empID, form.value.password);
    if(form.invalid){
      return;
    } else
    this.employeeService.login(form.value.empID, form.value.password);
  }
}
