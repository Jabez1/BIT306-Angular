import { FWA, WorkType, Status } from "./fwa.model";
import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router'

@Injectable({providedIn: 'root'})

export class FWAService {

  private fwaList: FWA[]=[];
  private fwaListUpdated = new Subject<FWA[]>();
  constructor(private http: HttpClient, private router: Router){}

  //Group FWA for FWA Analytics
  groupBy = <T, K extends keyof any>(list: T[], getKey: (item: T) => K) =>
  list.reduce((previous, currentItem) => {
    const group = getKey(currentItem);
    if (!previous[group]) previous[group] = [];
    previous[group].push(currentItem);
    return previous;
  }, {} as Record<K, T[]>);

  private groupedFwaList= this.groupBy(this.fwaList, i => i.requestDate.toLocaleDateString());
  private groupedFwaListWorkType= this.groupBy(this.fwaList, i => i.workType);


  getGroupedFWAList(){
    return this.groupedFwaList;
  }

  getGroupedFWAListWorkType(){
    return this.groupedFwaListWorkType;
  }

  //Approve FWA
  acceptFWA(fwaID :string, comment: string){
    this.fwaList.find(x => x.id === fwaID)!.status = Status.Accepted;
    this.fwaList.find(x => x.id === fwaID)!.comment= comment;
  }

  rejectFWA(fwaID :string, comment: string){
  this.fwaList.find(x => x.id === fwaID)!.status = Status.Rejected;
  this.fwaList.find(x => x.id === fwaID)!.comment= comment;
  }

  getFWA(id:string){
    return {...this.fwaList.find(p=>p.id === id)};
  }

  //http FWA functions
  getFWAList(){
  this.http.get<{message: String, fwaList: any}>('http://localhost:3000/api/fwa')
    .pipe(map((fwaData) => {
      return fwaData.fwaList?.map((fwa: { _id: any; employeeID: any; requestDate: any; workType: any; description: any; reason: any; status: any; comment: any; })=> {
        return {
          id:fwa._id,
          employeeID: fwa.employeeID,
          requestDate: fwa.requestDate,
          workType: fwa.workType,
          description: fwa.description,
          reason: fwa.reason,
          status: fwa.status,
          comment: fwa.comment
        }
      })
    }))
    .subscribe((transformedFWA) =>{
      console.log(this.fwaList);
      console.log(transformedFWA);
      this.fwaList = transformedFWA;
      this.fwaListUpdated.next([...this.fwaList]);
    })
  }

   getFWAListUpdateListener(){
    return this.fwaListUpdated.asObservable();
   }

  addFWA(workType : WorkType, description: string, reason : string){
    const fwaReq : FWA = {
      id: "",
      employeeID: "",
      requestDate: new Date(),
      workType: WorkType[workType as keyof typeof WorkType],
      description: description,
      reason: reason,
      status: Status.Pending,
      comment: ""};
    this.http
    .post<{message:string}>('http://localhost:3000/api/fwa', fwaReq)
    .subscribe((responseData) =>{
      console.log(responseData.message);
      this.fwaList.push(fwaReq);
      this.fwaListUpdated.next([...this.fwaList])
    });
    //this.router.navigate(['/employee-home']);
  }

  deletePost(fwaID: string){
    this.http.delete('http://localhost:3000/api/fwa/'+ fwaID)
    .subscribe(()=>{
      console.log("Deleted");
      //this.router.navigate(['/supervisor-home']);
    })
  }
  reviewFWA(fwaID: string, employeeID: string,
    requestID: string, requestDate: Date,
      workType : WorkType, description  : string, reason : string,
      status: Status, comment: string){
    const fwaReq : FWA = {
      id: fwaID,
      employeeID: employeeID,
      requestDate: requestDate,
      workType: WorkType[workType as keyof typeof WorkType],
      description: description,
      reason: reason,
      status: status,
      comment: comment};
    this.http.put('http://localhost:3000/api/posts/'+ fwaID, fwaReq)
    .subscribe(response =>{
      console.log(response);
      //this.router.navigate(['/']);
    })
  }
 }
