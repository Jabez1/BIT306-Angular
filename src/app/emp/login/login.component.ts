import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EmployeeService } from '../employee.service';
import { NewLoginComponent } from '../login/new-login/new-login.component';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Employee, Status, Position} from '../employee.model';
import { AuthService } from "../auth-service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(public employeeService: EmployeeService,public dialog: MatDialog, public authService: AuthService){}


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

  openDialog() {
    const dialogRef = this.dialog.open(NewLoginComponent, {
      height: '320px',
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
