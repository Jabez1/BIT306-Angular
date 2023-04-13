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
      this.fwaList = transformedFWA;
      this.fwaListUpdated.next([...this.fwaList]);
    })
  }

  getFWAListUpdateListener(){
  return this.fwaListUpdated.asObservable();
  }

  addFWA(employeeID : string, workType : WorkType, description: string, reason : string){
    const fwaReq : FWA = {
      id: "",
      employeeID: employeeID,
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
    this.router.navigate(['/employee-home']);
  }

  deleteFWA(fwaID: string){
    this.http.delete('http://localhost:3000/api/fwa/'+ fwaID)
    .subscribe(()=>{
      console.log("Deleted");
      //this.router.navigate(['/supervisor-home']);
    })
  }

  //Review FWA
  reviewFWA(fwaID: string, employeeID: string, requestDate: Date,
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
    this.http.put('http://localhost:3000/api/fwa/'+ fwaID, fwaReq)
    .subscribe(response =>{
      console.log(response);
      this.router.navigate(['/supervisor-home']);
    })
  }
 }
