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


import { AppComponent } from './app.component';
import { FwaFormComponent } from './fwa/fwaform/fwaform.component';
import { FwaViewComponent } from './fwa/fwaview/fwaview.component';
import { FwaReviewComponent } from './fwa/fwareview/fwareview.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const appRoutes : Routes = [
  {path: 'fwaReq', component : FwaFormComponent},
  {path: 'fwaRev', component : FwaReviewComponent},
  {path: 'fwaView', component : FwaViewComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    FwaFormComponent,
    FwaViewComponent,
    FwaReviewComponent,
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
    RouterModule.forRoot(
      appRoutes
    ),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
