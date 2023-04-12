import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FwaFormComponent } from './fwa/fwaform/fwaform.component';
import { FwaViewComponent } from './fwa/fwaview/fwaview.component';
import { FwaReviewComponent } from './fwa/fwareview/fwareview.component';
import { LoginComponent } from './emp/login/login.component';
import { AdminHomeComponent } from './user-homes/admin-home/admin-home.component';
import { EmpHomeComponent } from './user-homes/emp-home/emp-home.component';
import { SupHomeComponent } from './user-homes/sup-home/sup-home.component';
import { RegEmpComponent } from './emp/reg-emp/reg-emp.component';
import { RevEmpScheduleComponent } from './emp-schedule/rev-emp-schedule/rev-emp-schedule.component';
import { UpdateDailyScheduleComponent } from './emp-schedule/update-daily-schedule/update-daily-schedule.component';
import { NewLoginComponent } from './emp/login/new-login/new-login.component';

const routes : Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'admin-home', component: AdminHomeComponent ,
      children: [
        { path: '', redirectTo: 'regEmp', pathMatch: 'full' },
        { path: 'regEmp', component: RegEmpComponent },
        { path: 'fwaView', component: FwaViewComponent }
      ]
  },
  { path: 'supervisor-home', component: SupHomeComponent ,
      children: [
        { path: '', redirectTo: 'fwaView', pathMatch: 'full' },
        { path: 'fwaView', component: FwaViewComponent },
        { path: 'revEmpSched', component: RevEmpScheduleComponent },
        { path: 'fwaRev', component: FwaReviewComponent }
      ]
  },
  { path: 'employee-home', component: EmpHomeComponent ,
      children: [
        { path: '', redirectTo: 'updateDailySchedule', pathMatch: 'full' },
        { path: 'updateDailySchedule', component: UpdateDailyScheduleComponent },
        { path: 'fwaReq', component: FwaFormComponent }
      ]
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
