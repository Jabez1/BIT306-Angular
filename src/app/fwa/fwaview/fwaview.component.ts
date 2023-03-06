import { Component } from '@angular/core';
import { FWAService } from '../fwa.service';
import { FWA, Status, WorkType } from "../fwa.model";

@Component({
  selector: 'app-fwaview',
  templateUrl: './fwaview.component.html',
  styleUrls: ['./fwaview.component.css']
})
export class FwaViewComponent {
  readonly Status = Status;
  readonly WorkType = WorkType;

  enumVal(enumKey: string) {
    return WorkType[enumKey as keyof typeof WorkType];
   }

  fwaList: FWA[] = [];
  constructor(public fwaService: FWAService){

  }
  ngOnInit(){
    this.fwaList= this.fwaService.getFWAList();
  }
}

