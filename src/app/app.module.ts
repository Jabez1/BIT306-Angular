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

const appRoutes : Routes = [
  { path: 'fwaReq', component : FwaFormComponent },
  { path: 'fwaRev', component : FwaReviewComponent },
  { path: 'fwaView', component : FwaViewComponent },
  { path: 'login', component: LoginComponent }
  /*
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'admin-home', component: AdminComponent ,
      children: [
        { path: '', redirectTo: 'fwaView', pathMatch: 'full' },
        { path: 'fwaView', component: FwaViewComponent },
        { path: 'regemployee', component: regemployee }
      ]
  },
  { path: 'supervisor-home', component: SupHomeComponent ,
      children: [
        { path: '', redirectTo: 'fwaView', pathMatch: 'full' },
        { path: 'fwaView', component: FwaViewComponent },
        { path: 'fwaRev', component: FwaReviewComponent },
        { path: 'reviewemployeesche', component: reviewemployeesche }
      ]
  },
  { path: 'employee-home', component: EmpHomeComponent ,
      children: [
        { path: '', redirectTo: 'updatedailyschedule', pathMatch: 'full' },
        { path: 'updatedailyschedule', component: updatedailyschedule },
        { path: 'fwaReq', component: FwaFormComponent }
      ]
  }
  */
]

@NgModule({
  declarations: [
    AppComponent,
    FwaFormComponent,
    FwaViewComponent,
    FwaReviewComponent,
    HeaderComponent,
    LoginComponent,
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
