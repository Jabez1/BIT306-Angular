import { Component } from '@angular/core';
import { FWAService } from '../fwa.service';
import { FWA, Status, WorkType } from "../fwa.model";
import { NgForm } from '@angular/forms'
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-fwareview',
  templateUrl: './fwareview.component.html',
  styleUrls: ['./fwareview.component.css']
})
export class FwaReviewComponent {
  readonly Status = Status;
  readonly WorkType = WorkType;

  getDateStr(date: Date){
    return new Date(date).toLocaleDateString();
  }

  fwaList: FWA[] = [];
  private fwaListSub: Subscription | undefined;
  constructor(public fwaService: FWAService){}
  ngOnInit(){
    this.fwaService.getFWAList();
    this.fwaListSub = this.fwaService.getFWAListUpdateListener()
    .subscribe((fwaList: FWA[]) => {
      this.fwaList = fwaList;
    });
    console.log(this.fwaList);
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
