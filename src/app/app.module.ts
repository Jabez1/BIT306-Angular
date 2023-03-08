import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule  } from '@angular/material/input';
import { MatCardModule  } from '@angular/material/card';
import { MatButtonModule  } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';

import { AppComponent } from './app.component';
import { FwaFormComponent } from './fwa/fwaform/fwaform.component';
import { FwaViewComponent } from './fwa/fwaview/fwaview.component';
import { FwaReviewComponent } from './fwa/fwareview/fwareview.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { AdminHomeComponent } from './user-homes/admin-home/admin-home.component';
import { EmpHomeComponent } from './user-homes/emp-home/emp-home.component';
import { SupHomeComponent } from './user-homes/sup-home/sup-home.component';
import { RegEmpComponent } from './reg-emp/reg-emp.component';
import { RevEmpScheduleComponent } from './rev-emp-schedule/rev-emp-schedule.component';
import { UpdateDailyScheduleComponent } from './update-daily-schedule/update-daily-schedule.component';

const appRoutes : Routes = [

  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'admin-home', component: AdminHomeComponent ,
      children: [
        { path: '', redirectTo: 'fwaView', pathMatch: 'full' },
        { path: 'RegEmp', component: RegEmpComponent },
        { path: 'fwaView', component: FwaViewComponent }
      ]
  },
  { path: 'supervisor-home', component: SupHomeComponent ,
      children: [
        { path: '', redirectTo: 'fwaView', pathMatch: 'full' },
        { path: 'fwaView', component: FwaViewComponent },
        { path: 'RevEmpSched', component: RevEmpScheduleComponent },
        { path: 'fwaRev', component: FwaReviewComponent }
      ]
  },
  { path: 'employee-home', component: EmpHomeComponent ,
      children: [
        { path: '', redirectTo: 'fwaReq', pathMatch: 'full' },
        { path: '', redirectTo: 'updateDailySchedule', pathMatch: 'full' },
        { path: 'updateDailySchedule', component: UpdateDailyScheduleComponent },
        { path: 'fwaReq', component: FwaFormComponent }
      ]
  }

]

@NgModule({
  declarations: [
    AppComponent,
    FwaFormComponent,
    FwaViewComponent,
    FwaReviewComponent,
    HeaderComponent,
    LoginComponent,
    AdminHomeComponent,
    EmpHomeComponent,
    SupHomeComponent,
    RegEmpComponent,
    RevEmpScheduleComponent,
    UpdateDailyScheduleComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatExpansionModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatSelectModule,
    RouterModule.forRoot(
      appRoutes
    ),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
