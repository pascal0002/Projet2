import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from '@angular/forms'; 
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from "./app.component";
import { BasicService } from "./basic.service";
import { HttpClientModule } from "@angular/common/http";
import { PartsListViewComponent } from './parts-list-view/parts-list-view.component';
import { AdministrationViewComponent } from "./administration-view/administration-view.component";

 const appRoutes: Routes =[
   { path: 'admin', component: AdministrationViewComponent },
   { path: '', component: PartsListViewComponent }
 ];

@NgModule({
  declarations: [
    AppComponent,
    PartsListViewComponent,
    AdministrationViewComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [BasicService],
  bootstrap: [AppComponent]
})
export class AppModule { }
