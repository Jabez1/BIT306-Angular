import { HttpClient } from '@angular/common/http';
import { Employee , Position, FWAStatus, Status } from './employee.model';
import { Router } from '@angular/router';
import { NewLoginComponent } from './login/new-login/new-login.component';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Injectable({providedIn : 'root'})

export class AuthService {
  private isAuthenticated : boolean = false;
  private authStatusListener = new Subject<boolean>();
  private token!: string;
  private loggedInEmp !: any;

  private empList: Employee[]=[];
  private empListUpdated = new Subject<Employee[]>();
  constructor(private http: HttpClient, public dialog: MatDialog, private router: Router){}

  getToken(){
    return this.token;
  }

  geAuthStatusListener(){
    return this.authStatusListener.asObservable();
  }

  getLoggedInEmp(){
    return this.loggedInEmp;
  }

  createEmployee(employeeID: string, fullName : string, deptID : string, position: Position,
    email :string, supervisorID: string){
    const authData: Employee = {
      id:"",
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

  getEmpList(){
    this.http.get<{message: String, empList: any}>('http://localhost:3000/api/employee/find')
    .pipe(map((empData) => {
      return empData.empList?.map((emp: { _id: any; employeeID: any; password: any; fullName : any;
        deptID : any; position: any; FWAStatus : any; Status: any; comment: any;
    email :any; supervisorID: string; })=> {
        return {
          id:emp._id,
          employeeID: emp.employeeID,
          password: emp.password,
          name: emp.fullName,
          position: emp.position,
          email: emp.email,
          FWAStatus: emp.FWAStatus,
          Status: emp.Status,
          comment: emp.comment || "",
          supervisorID: emp.supervisorID || "",
          deptID : emp.deptID
        }
      })
    }))
    .subscribe((transformedEmp) =>{
      this.empList = transformedEmp;
      this.empListUpdated.next([...this.empList]);
    })
  }

  getEmpListUpdateListener(){
    return this.empListUpdated.asObservable();
  }

  login(employeeID: string, password:string){
    const authData: Employee = {
      id:"",
      employeeID:employeeID,
      password:password,
      name: "",
      position: Position.Employee,
      email: "",
      FWAStatus: FWAStatus.None,
      Status: Status.NONE,
      comment: "",
      supervisorID: "",
      deptID : ""};
    this.http.post<{emp: any, token : string}>('http://localhost:3000/api/employee/login', authData)
      .subscribe(response => {
        const token = response.token;
        this.token = token;
        if(token){
          this.isAuthenticated = true;
          this.authStatusListener.next(true);
        }
        this.loggedInEmp= response.emp;
        if(this.loggedInEmp.Status == Status.NEW){
          console.log(this.loggedInEmp._id);
          this.openDialog();
        }
        else{
          this.routeEmp(response.emp);
        }
      })
  }

  newEmpSetup(newPassword: string){
    const emp : Employee = {
      id: this.loggedInEmp._id,
      employeeID: this.loggedInEmp.employeeID,
      password: newPassword,
      name: this.loggedInEmp.name,
      position: this.loggedInEmp.position,
      email: this.loggedInEmp.email,
      FWAStatus: this.loggedInEmp.FWAStatus,
      Status: Status.NONE,
      comment: this.loggedInEmp.comment,
      supervisorID: this.loggedInEmp.supervisorID,
      deptID : this.loggedInEmp.deptID};
    console.log(emp);
    this.http.put('http://localhost:3000/api/employee/'+ emp.id, emp)
    .subscribe(response =>{
      console.log(response);
      this.routeEmp(emp);
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

  openDialog() {
    const dialogRef = this.dialog.open(NewLoginComponent, {
      height: '320px',
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  logOut(){
    this.token = null!;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.router.navigate(['/login']);
  }
}
