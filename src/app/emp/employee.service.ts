import { Employee, Department, FWAStatus, Position, Status} from "./employee.model"
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({providedIn: 'root'})

export class EmployeeService {

  private empList: Employee[] = [
    {employeeID:'E001', password:'123', name:'Mike Wazowski', position: Position.Admin, email:'email@gmail.com',
    FWAStatus:FWAStatus.None, Status: Status.NONE, comment:'',supervisorID: '',deptID: '' },
    {employeeID:'E002', password:'123', name:'John Lemon', position: Position.Supervisor, email:'email@gmail.com',
    FWAStatus:FWAStatus.WorkFromHome, Status: Status.NONE, comment:'',supervisorID: '',deptID: '' },
    {employeeID:'E003', password:'123', name:'Selena Gomes', position: Position.Employee, email:'email@gmail.com',
    FWAStatus:FWAStatus.Hybrid, Status: Status.NONE, comment:'',supervisorID: '',deptID: '' },
    {employeeID:'E004', password:'123', name:'Ryan Renold', position: Position.Employee, email:'email@gmail.com',
    FWAStatus:FWAStatus.FlexiHour, Status: Status.NEW, comment:'',supervisorID: '',deptID: '' },
    {employeeID:'E005', password:'123', name:'Kim John Un', position: Position.Employee, email:'email@gmail.com',
    FWAStatus:FWAStatus.None, Status: Status.NONE, comment:'',supervisorID: '',deptID: '' }
  ];

  private deptList: Department[]=[
    {deptID: 'D001', deptName:'Human Resources'},
    {deptID: 'D002', deptName:'IT Management'},
    {deptID: 'D003', deptName:'Transporation'}
  ]

  loggedInEmployee!: Employee;

  login (employeeID: string, password: string) : Employee | undefined {

    const emp = this.empList.find(x => x.employeeID == employeeID && x.password == password);
    const findID =  this.empList.find(x => x.employeeID == employeeID);
    // find will return undefined in case no matches found
    if(emp != undefined) {
      this.loggedInEmployee= emp;
      return emp;
    }
    if(findID != undefined){
      alert("Incorrect password, please try again");
    }else
    alert("User not found, please try again");
    return undefined;
  }

  addEmp(employeeID: string, position: Position, name:string, email:string,
    deptID: string, supervisorID:string){
    const findEmp = this.empList.find(x => x.employeeID == employeeID);
    if(findEmp != undefined) {
      alert("Current Emp ID is in use, please select a new ID");
      return false;
    }
    else{
      const emp : Employee = {
        employeeID: employeeID,
        password: "",
        name: name,
        position: position,
        email: email,
        FWAStatus: FWAStatus.None,
        Status: Status.NEW,
        comment: "",
        deptID: deptID,
        supervisorID: supervisorID
      };
      this.empList.push(emp);
      alert("Employee added successfully!");
      this.router.navigate(['/admin-home/fwaView']);
      return true;
    }
  }

  routeEmp(emp: Employee){
    if(emp == undefined){
      console.log("Cannot route undefined employee");
    }
    else if(emp.position === Position.Admin){
      this.router.navigate(['/admin-home']);
    } else if(emp.position === Position.Supervisor){
      this.router.navigate(['/supervisor-home'])
    } else if(emp.position === Position.Employee){
      this.router.navigate(['/employee-home'])
    }
  }

  newEmpSetup(newPassword: string, empID : string){
    const empIndex =  this.empList.findIndex(x => x.employeeID == empID);
    const emp = this.empList[empIndex];
    if(emp == undefined){
      console.log("error");
    }
    else{
      emp.password = newPassword;
      emp.Status = Status.NONE;
    }
  }

  whoseLoggedIn(){
    return this.loggedInEmployee;
  }
  logout(){
    this.loggedInEmployee = { employeeID:'', password:'', name:'', position: Position.Employee, email:'', FWAStatus:FWAStatus.None, Status: Status.NONE, comment:'',supervisorID: '',deptID: '' };
  }
  getDeptList(){
    return this.deptList;
  }
  getEmpList(){
    return this.empList;
  }
  findEmpName(employeeID :string){
    const findEmp = this.empList.find(x => x.employeeID == employeeID);
    if(findEmp != undefined) {
      return findEmp.name;
    }
    else
    return "";
  }
  constructor(private router: Router) { }
 }
