import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EmployeeService } from '../../employee.service';

@Component({
  selector: 'app-new-login',
  templateUrl: './new-login.component.html',
  styleUrls: ['./new-login.component.css']
})
export class NewLoginComponent {
  constructor(public dialogRef: MatDialogRef<NewLoginComponent>, private employeeService: EmployeeService) {}

  newLogin(form : NgForm){
    if(form.invalid){
      return;
    }
    else{
      this.employeeService.newEmpSetup(form.value.password, this.employeeService.whoseLoggedIn().employeeID);
      this.employeeService.routeEmp(this.employeeService.whoseLoggedIn());
      this.onNoClick();
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
