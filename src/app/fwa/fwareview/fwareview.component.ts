import { Component } from '@angular/core';
import { FWAService } from '../fwa.service';
import { FWA, Status, WorkType } from "../fwa.model";
import { NgForm } from '@angular/forms'

@Component({
  selector: 'app-fwareview',
  templateUrl: './fwareview.component.html',
  styleUrls: ['./fwareview.component.css']
})
export class FwaReviewComponent {
  readonly Status = Status;
  readonly WorkType = WorkType;

  fwaList: FWA[] = [];
  constructor(public fwaService: FWAService){}
  ngOnInit(){
    this.fwaService.getFWAList();
  }


  onFWASubmit(reqID: string, status: string, form : NgForm){
    if (reqID == null){
      alert("error");
      return;
    }
    if(status== "accept"){
      this.fwaService.acceptFWA(reqID, form.value.comment);
    } else if(status== "reject"){
      this.fwaService.rejectFWA(reqID, form.value.comment);
    } else{
      alert("error2");
      return;
    }
    this.ngOnInit();
  }

}
