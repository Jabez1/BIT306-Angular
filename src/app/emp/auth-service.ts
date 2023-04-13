import { HttpClient } from '@angular/common/http';
import { Employee , Position, FWAStatus, Status } from './employee.model';
import { Router } from '@angular/router';

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({providedIn : 'root'})

export class AuthService {
  private token: string | undefined;
  private authStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router){}

  getToken(){
    return this.token;
  }

  geAuthStatusListener(){
    return this.authStatusListener.asObservable();
  }

  createEmployee(employeeID: string, fullName : string, deptID : string, position: Position,
    email :string, supervisorID: string){
    const authData: Employee = {
      employeeID: employeeID,
      password: "123",
      name: fullName,
      position: position,
      email: email,
      FWAStatus: FWAStatus.None,
      Status: Status.NEW,
      comment: "None",
      supervisorID: supervisorID,
      deptID : deptID};
    console.log(authData);

    this.http.post('http://localhost:3000/api/employee/signup', authData)
      .subscribe(response =>{
        console.log(response);
        this.router.navigate(['/admin-home/fwaView']);
      });
  }

  login(employeeID: string, password:string){
    const authData: Employee = {employeeID:employeeID, password:password,
      name: "",
      position: Position.Employee,
      email: "",
      FWAStatus: FWAStatus.None,
      Status: Status.NONE,
      comment: "",
      supervisorID: "",
      deptID : ""};
    this.http.post<{emp: Employee, token : string}>('http://localhost:3000/api/employee/login', authData)
      .subscribe(response => {
        const token = response.token;
        this.token = token;
        this.authStatusListener.next(true);
        console.log(response);
        this.routeEmp(response.emp);
      })
  }

  routeEmp(emp: Employee){
    if(emp == undefined){
      console.log("Cannot route undefined employee");
    }
    else if(emp.position == Position.Admin){
      this.router.navigate(['/admin-home']);
    } else if(emp.position == Position.Supervisor){
      this.router.navigate(['/supervisor-home'])
    } else if(emp.position == Position.Employee){
      this.router.navigate(['/employee-home'])
    } else{
      console.log(emp.position);
    }
  }

  logOut(){
    this.token = null!;
    this.authStatusListener.next(false);
    this.router.navigate(['/login']);
  }
}
