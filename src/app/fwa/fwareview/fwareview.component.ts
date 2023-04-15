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
    //Gets the FWAList but immediately filters it by those with a Pending Status
    this.fwaService.getFWAList();
    this.fwaListSub = this.fwaService.getFWAListUpdateListener()
    .subscribe((fwaList: FWA[]) => {
      this.fwaList = fwaList.filter(x => x.status === Status.Pending);
      //console.log(this.fwaList);
    });
  }

  onFWASubmit(id: string, status: string, form : NgForm){
    if (id == null){
      alert("error");
      return;
    }
    const fwa = this.fwaService.getFWA(id);
    console.log(fwa);
    if(fwa == null){
      alert('error2');
      return;
    }
    if(status== "accept"){
      this.fwaService.reviewFWA(fwa.id!, fwa.employeeID!, fwa.requestDate!,
        fwa.workType!, fwa.description!, fwa.reason!,
        Status.Accepted,form.value.comment);
    } else if(status== "reject"){
      this.fwaService.reviewFWA(fwa.id!, fwa.employeeID!, fwa.requestDate!,
        fwa.workType!, fwa.description!, fwa.reason!,
        Status.Rejected,form.value.comment);
    } else{
      alert("error3");
      return;
    }
    this.ngOnInit();
  }

}
