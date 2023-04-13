import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EmployeeService } from '../../employee.service';
import { AuthService } from "../../auth-service";

@Component({
  selector: 'app-new-login',
  templateUrl: './new-login.component.html',
  styleUrls: ['./new-login.component.css']
})
export class NewLoginComponent {
  constructor(public dialogRef: MatDialogRef<NewLoginComponent>, private employeeService: EmployeeService,
    public authService: AuthService) {}

  newLogin(form : NgForm){
    if(form.invalid){
      return;
    }
    else{
      // this.employeeService.newEmpSetup(form.value.password, this.employeeService.whoseLoggedIn().employeeID);
      // this.employeeService.routeEmp(this.employeeService.whoseLoggedIn());
      this.authService.newEmpSetup(form.value.password);
      this.onNoClick();
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
