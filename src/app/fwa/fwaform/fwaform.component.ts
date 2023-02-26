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
  enumVal = Object.values;
  workTypes = WorkType;

  constructor(public fwaService: FWAService){}

  onFWASubmit(form: NgForm){
    if (form.invalid){
      return;
    }
    this.fwaService.addFWA(form.value.workType, form.value.description, form.value.reason)
  }
}
