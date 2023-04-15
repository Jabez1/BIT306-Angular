import { Component } from '@angular/core';
import { FWAService } from '../fwa.service';
import { FWA, Status, WorkType } from "../fwa.model";
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
  //Get Department IDs from the Department List
  readonly Departments = Object.keys(this.authService.getDeptList());

  objValues = Object.values;
  objKeys = Object.keys;

  empList: Employee[] = [];
  fwaList: FWA[] = [];

  groupedFWAList: any = [];
  groupedFWAListWorkType : any = [];

  defaultDept = "";

  constructor(
    public fwaService: FWAService,
    public authService: AuthService){
  }

  //functions to populate the mat-select in the html page
  getDeptVal(key : any){ return this.authService.getDeptList()[key]; }

  getDeptValString(key: any){
    return this.authService.getDeptList()[key].deptID + " : "
    + this.authService.getDeptList()[key].deptName;
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

  //Group FWA by either Date or WorkType for FWA Analytics elements
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
          //Filters the FWA List by FWA made by Employees who are in the correct Department
          return this.findEmp(x.employeeID)?.deptID == deptID
        });
        // console.log(this.fwaList);
        this.groupedFWAList = this.groupBy(this.fwaList, i =>
          new Date(i.requestDate).toLocaleDateString());
        this.groupedFWAListWorkType = this.groupBy(this.fwaList, i => i.workType);
          // console.log(this.getGroupedFWAList());
          // console.log(this.getGroupedFWAListWorkType());
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
    });
    //initialize emp list to filter FWAs
    this.authService.getEmpList();
    this.empListSub = this.authService.getEmpListUpdateListener()
    .subscribe((empList: Employee[]) => {
      this.empList = empList;
    })
    //finds the user Department ID and sets the page Department ID
    if(this.authService.getLoggedInEmp())
    this.defaultDept = this.authService.getLoggedInEmp().deptID;
  }

  findEmp(EmployeeID : string){
    return this.empList.find((x)=> {
      return x.employeeID === EmployeeID
    })
  }

  getLoggedInEmpPos(){
    //if the Employee logged in is not undefined, return position
    if(this.authService.getLoggedInEmp())
    return this.authService.getLoggedInEmp().position;
    else
    return null
  }

  ngOnDestroy(){
    this.fwaListSub?.unsubscribe();
    this.empListSub?.unsubscribe();
  }
}
