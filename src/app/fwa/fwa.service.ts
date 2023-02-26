import { FWA, WorkType, Status } from "./fwa.model";
import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})

export class FWAService {
  private fwaList: FWA[] = [];

  getFWAList(){
   return  this.fwaList;
  }

   addFWA(workType : WorkType, description: string, reason : string){
     const fwaR : FWA = {
      requestID: "test",
      requestDate: new Date(),
      workType: workType,
      description: description,
      reason: reason,
      status: Status.Pending,
      comment: ""};
     this.fwaList.push(fwaR);
   }
 }
