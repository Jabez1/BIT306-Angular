import { Component } from '@angular/core';
import { FWAService } from '../fwa.service';
import { FWA, Status, WorkType } from "../fwa.model";

@Component({
  selector: 'app-fwareview',
  templateUrl: './fwareview.component.html',
  styleUrls: ['./fwareview.component.css']
})
export class FwaReviewComponent {
  readonly Status = Status;
  readonly WorkType = WorkType;

  fwaList: FWA[] = [];
  constructor(public fwaService: FWAService){

  }
  ngOnInit(){
    this.fwaList= this.fwaService.getFWAList().filter(x => x.status === Status.Pending);
  }

  onFWASubmit(reqID: string, status: string){
    if (reqID == null){
      alert("error");
      return;
    }
    if(status== "accept"){
      this.fwaService.acceptFWA(reqID);
    } else if(status== "reject"){
      this.fwaService.rejectFWA(reqID);
    } else{
      alert("error2");
      return;
    }
    this.ngOnInit();
  }
}
