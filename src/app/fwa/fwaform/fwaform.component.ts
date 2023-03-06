import { Component } from '@angular/core';
import { WorkType } from '../fwa.model';
import { FWAService } from '../fwa.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-fwaform',
  templateUrl: './fwaform.component.html',
  styleUrls: ['./fwaform.component.css']
})

export class FwaFormComponent {
  enumKeys = Object.keys;
  workTypes = WorkType;

  enumVal(enumKey: string) {
   return WorkType[enumKey as keyof typeof WorkType];
  }
  constructor(public fwaService: FWAService){}

  onFWASubmit(form: NgForm){
    if (form.invalid){
      return;
    }
    //console.log(WorkType[form.value.WorkType as keyof typeof WorkType]);
    //console.log(form.value.WorkType);
    //console.log(WorkType.FlexiHour);
    this.fwaService.addFWA(form.value.workType, form.value.description, form.value.reason)
  }
}
