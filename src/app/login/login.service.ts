import { Employee, FWAStatus, Position, Status} from "./login.model"
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({providedIn: 'root'})

export class LoginService {
  private empList: Employee[] = [
    {employeeID:'E001', password:'123', name:'Mike Wazowski', position: Position.Admin, email:'email@gmail.com',
    FWAStatus:FWAStatus.None, Status: Status.NONE, comment:''},
    {employeeID:'E002', password:'123', name:'John Lemon', position: Position.Supervisor, email:'email@gmail.com',
    FWAStatus:FWAStatus.WorkFromHome, Status: Status.NEW, comment:''},
    {employeeID:'E003', password:'123', name:'Selena Gomes', position: Position.Employee, email:'email@gmail.com',
    FWAStatus:FWAStatus.Hybrid, Status: Status.NONE, comment:''},
    {employeeID:'E004', password:'123', name:'Ryan Renold', position: Position.Employee, email:'email@gmail.com',
    FWAStatus:FWAStatus.FlexiHour, Status: Status.NONE, comment:''},
    {employeeID:'E005', password:'123', name:'Kim John Un', position: Position.Employee, email:'email@gmail.com',
    FWAStatus:FWAStatus.None, Status: Status.NONE, comment:''}
    ];
  loggedInEmployee!: Employee;
  login (employeeID: string, password: string) : boolean {

    const emp = this.empList.find(x => x.employeeID == employeeID && x.password == password);
    // find will return undefined in case no matches found
    if(emp != undefined) {
      this.loggedInEmployee= emp;
      if(emp.position === Position.Admin){
        this.router.navigate(['/admin-home']);
      } else if(emp.position === Position.Supervisor){
        this.router.navigate(['/supervisor-home'])
      } else if(emp.position === Position.Employee){
        this.router.navigate(['/employee-home'])
      }
      return true;
    }
    alert("fail");
    return false;
  }

  whoseLoggedIn(){
    return this.loggedInEmployee;
  }
  logout(){
    this.loggedInEmployee = { employeeID:'', password:'', name:'', position: Position.Employee, email:'', FWAStatus:FWAStatus.None, Status: Status.NONE, comment:'' };
  }
  constructor(private router: Router ) { }
 }
