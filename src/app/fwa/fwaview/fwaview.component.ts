import { Component } from '@angular/core';
import { FWAService } from '../fwa.service';
import { FWA, Status, WorkType } from "../fwa.model";
import { EmployeeService } from 'src/app/emp/employee.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { AuthService } from 'src/app/emp/auth-service';
import { Employee, Position } from 'src/app/emp/employee.model';
import { EventListenerFocusTrapInertStrategy } from '@angular/cdk/a11y';

@Component({
  selector: 'app-fwaview',
  templateUrl: './fwaview.component.html',
  styleUrls: ['./fwaview.component.css']
})
export class FwaViewComponent {
  readonly Status = Status;
  readonly WorkType = WorkType;
  readonly Position = Position;
  private fwaListSub: Subscription | undefined;
  private empListSub: Subscription | undefined;
  readonly Departments = Object.keys(this.employeeService.getDeptList());

  objValues = Object.values;
  objKeys = Object.keys;

  empList: Employee[] = [];
  fwaList: FWA[] = [];

  groupedFWAList: any = [];
  groupedFWAListWorkType : any = [];

  defaultDept = "";

  constructor(
    public fwaService: FWAService,
    public employeeService: EmployeeService,
    public authService: AuthService){
  }

  getDeptVal(key : any){
    return this.employeeService.getDeptList()[key];
  }
  getDeptValString(key: any){
    return this.employeeService.getDeptList()[key].deptID + " : "
    + this.employeeService.getDeptList()[key].deptName;
  }

  getVal(key : any){
    return this.groupedFWAList[key];
  }
  getCount(key : any){
  return this.groupedFWAListWorkType[key as WorkType].length;
  }


  enumVal(enumKey: string) {
    return WorkType[enumKey as keyof typeof WorkType];
  }


  //Group FWA for FWA Analytics
  groupBy = <T, K extends keyof any>(list: T[], getKey: (item: T) => K) =>
  list.reduce((previous, currentItem) => {
    const group = getKey(currentItem);
    if (!previous[group]) previous[group] = [];
    previous[group].push(currentItem);
    return previous;
  }, {} as Record<K, T[]>);

  getGroupedFWAList(){
    return this.groupedFWAList;
  }

  getGroupedFWAListWorkType(){
    return this.groupedFWAListWorkType;
  }

  filterByDept(event : any){
    let deptID = event.value
    console.log(deptID);
    if(deptID == undefined){
      this.ngOnInit();
    }
    else{
      this.fwaService.getFWAList();
      this.fwaListSub = this.fwaService.getFWAListUpdateListener()
      .subscribe((fwaList: FWA[]) => {
        this.fwaList = fwaList.filter(x =>{
          // console.log(this.findEmpDeptID(x.employeeID) == deptID);
          return this.findEmp(x.employeeID)?.deptID == deptID
        });
        // console.log(this.fwaList);
        this.groupedFWAList = this.groupBy(this.fwaList, i =>
          new Date(i.requestDate).toLocaleDateString());
        this.groupedFWAListWorkType = this.groupBy(this.fwaList, i => i.workType);
          console.log(this.getGroupedFWAList());
          console.log(this.getGroupedFWAListWorkType());
      });
    }
  }

  ngOnInit(){
    //initialize fwa list and grouped fwa list
    this.fwaService.getFWAList();
    this.fwaListSub = this.fwaService.getFWAListUpdateListener()
    .subscribe((fwaList: FWA[]) => {
      this.fwaList = fwaList;
      //groups FWAList by date
      this.groupedFWAList = this.groupBy(this.fwaList, i =>
        new Date(i.requestDate).toLocaleDateString());
      //groups FWAList by work type
      this.groupedFWAListWorkType = this.groupBy(this.fwaList, i => i.workType);
      // console.log(this.fwaList);
      // console.log(this.getGroupedFWAList());
      // console.log(this.getGroupedFWAListWorkType());
    });
    //initialize emp list to filter FWAs
    this.authService.getEmpList();
    this.empListSub = this.authService.getEmpListUpdateListener()
    .subscribe((empList: Employee[]) => {
      this.empList = empList;
    })
    //finds the user Department ID and sets the page Department ID
    this.defaultDept = this.authService.getLoggedInEmp().deptID;
  }

  findEmp(EmployeeID : string){
    return this.empList.find((x)=> {
      return x.employeeID === EmployeeID
    })
  }

  getLoggedInEmpPos(){
    if(this.authService.getLoggedInEmp())
    return this.authService.getLoggedInEmp().position;
    else
    return null
  }

  ngOnDestroy(){
    this.fwaListSub?.unsubscribe();
  }
}
