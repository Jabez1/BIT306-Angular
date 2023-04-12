import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule  } from '@angular/material/input';
import { MatCardModule  } from '@angular/material/card';
import { MatButtonModule  } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
//import { AuthInterceptor } from './auth/auth-interceptor';

import { AppComponent } from './app.component';
import { FwaFormComponent } from './fwa/fwaform/fwaform.component';
import { FwaViewComponent } from './fwa/fwaview/fwaview.component';
import { FwaReviewComponent } from './fwa/fwareview/fwareview.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './emp/login/login.component';
import { AdminHomeComponent } from './user-homes/admin-home/admin-home.component';
import { EmpHomeComponent } from './user-homes/emp-home/emp-home.component';
import { SupHomeComponent } from './user-homes/sup-home/sup-home.component';
import { RegEmpComponent } from './emp/reg-emp/reg-emp.component';
import { RevEmpScheduleComponent } from './emp-schedule/rev-emp-schedule/rev-emp-schedule.component';
import { UpdateDailyScheduleComponent } from './emp-schedule/update-daily-schedule/update-daily-schedule.component';
import { NewLoginComponent } from './emp/login/new-login/new-login.component';

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
    NewLoginComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    MatExpansionModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatSelectModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
