import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { DatabusService } from './databus.service';
import { SurvivorsListComponent } from './survivors-list/survivors-list.component';

@NgModule({
  declarations: [
    AppComponent,
    SurvivorsListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    RouterModule.forRoot([
      { path: 'survivor/:id', component: SurvivorsListComponent },
      { path: 'survivors', component: SurvivorsListComponent },
      { path: '', redirectTo: '/survivors', pathMatch: 'full' }
    ])
  ],
  providers: [DatabusService],
  bootstrap: [AppComponent]
})
export class AppModule { }
