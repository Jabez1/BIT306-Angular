import { Injectable, OnInit } from "@angular/core";
import { DailySchedule, WorkHours } from "./emp-schedule.model";
import { HttpClient } from "@angular/common/http";
import { Router } from "express";


@Injectable({providedIn: 'root'})

export class EmpScheduleService {
    private empList: DailySchedule[]=[];
    constructor(private http: HttpClient, private router: Router){}

    addEmpSchedule( workHours: string, workLocation: string, workReport: string){
        const empReq : DailySchedule = {
          date: new Date,
          employeeID: "",
          supervisorComments: "",
          workHours: WorkHours[workHours as keyof typeof WorkHours],
          workLocation: workLocation,
          workReport: workReport};
        this.http
        .post<{message:string}>('http://localhost:3000/api/emp-schedule',empReq)
        .subscribe((responseData) =>{
            console.log(responseData.message);
            this.empList.push(empReq);
        })
    }

 }








