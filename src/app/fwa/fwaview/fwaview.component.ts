import { Component } from '@angular/core';
import { FWAService } from '../fwa.service';
import { FWA, Status, WorkType } from "../fwa.model";
import { EmployeeService } from 'src/app/emp/employee.service';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-fwaview',
  templateUrl: './fwaview.component.html',
  styleUrls: ['./fwaview.component.css']
})
export class FwaViewComponent {
  readonly Status = Status;
  readonly WorkType = WorkType;
  readonly empList = this.employeeService.getEmpList();
  private fwaListSub: Subscription | undefined;
  groupedFWAList: any;
  groupedFWAListWorkType : any;

  objKeys = Object.keys;
  getVal(key : any){
    return this.groupedFWAList[key];
  }
  getCount(key : any){
  return this.groupedFWAListWorkType[key as WorkType].length;
  }
  objValues = Object.values;

  enumVal(enumKey: string) {
    return WorkType[enumKey as keyof typeof WorkType];
  }

  fwaList: FWA[] = [];
  constructor(
    public fwaService: FWAService,
    public employeeService: EmployeeService){
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

  ngOnInit(){
    this.fwaService.getFWAList();
    this.fwaListSub = this.fwaService.getFWAListUpdateListener()
    .subscribe((fwaList: FWA[]) => {
      this.fwaList = fwaList;
      this.groupedFWAList = this.groupBy(this.fwaList, i =>
        new Date(i.requestDate).toLocaleDateString());
      this.groupedFWAListWorkType = this.groupBy(this.fwaList, i => i.workType);
      // console.log(this.fwaList);
      // console.log(this.getGroupedFWAList());
      // console.log(this.getGroupedFWAListWorkType());
    });
  }
  ngOnDestroy(){
    this.fwaListSub?.unsubscribe();
  }


}
