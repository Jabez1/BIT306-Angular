import { FWA, WorkType, Status } from "./fwa.model";
import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})

export class FWAService {
  private fwaList: FWA[] = [
    {
      requestID: "R001",
      requestDate: new Date("2023-01-16"),
      workType: WorkType.WorkFromHome,
      description: "Transportation issues",
      reason: "I live in another country and wish to not fly back and forth each weekday every week",
      status: Status.Pending,
      comment: ""},
    {
      requestID: "R002",
      requestDate: new Date("2023-02-16"),
      workType: WorkType.FlexiHour,
      description: "Working completely face to face is impractical for me",
      reason: "My work does not require me to be in office for most days of the week",
      status: Status.Accepted,
      comment: ""},
    {
      requestID: "R003",
      requestDate: new Date("2023-02-17"),
      workType: WorkType.Hybrid,
      description: "Some convenience",
      reason: "I do not have to be in office everyday",
      status: Status.Pending,
      comment: ""},
    {
      requestID: "R004",
      requestDate: new Date("2023-02-20"),
      workType: WorkType.WorkFromHome,
      description: "Description",
      reason: "I hate the office",
      status: Status.Pending,
      comment: ""
    },
    {
      requestID: "R005",
      requestDate: new Date(),
      workType: WorkType.WorkFromHome,
      description: "hi",
      reason: "why not",
      status: Status.Pending,
      comment: ""
    }];

  getFWAList(){
   return  this.fwaList;
  }

   addFWA(workType : WorkType, description: string, reason : string){
     const fwaR : FWA = {
      requestID: "test",
      requestDate: new Date(),
      workType: WorkType[workType as keyof typeof WorkType],
      description: description,
      reason: reason,
      status: Status.Pending,
      comment: ""};
     this.fwaList.push(fwaR);
   }

   acceptFWA(reqID :string){
    this.fwaList.find(x => x.requestID === reqID)!.status = Status.Accepted;
   }

   rejectFWA(reqID :string){
    this.fwaList.find(x => x.requestID === reqID)!.status = Status.Rejected;
   }
 }
