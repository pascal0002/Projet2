import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from '@angular/forms'; 
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from "./app.component";
import { BasicService } from "./basic.service";
import { HttpClientModule } from "@angular/common/http";
import { PartsListViewComponent } from './parts-list-view/parts-list-view.component';
import { TwoDimensionGameCardComponent } from './2d-game-card/2d-game-card.component';
import { ThreeDimensionGameCardComponent } from './3d-game-card/3d-game-card.component';
import { GenericGameCardComponent } from './generic-game-card/generic-game-card.component';
import { AdministrationViewComponent } from "./administration-view/administration-view.component";

 const appRoutes: Routes =[
   { path: 'admin', component: AdministrationViewComponent },
   { path: '', component: PartsListViewComponent }
 ];

@NgModule({
  declarations: [
    AppComponent,
    PartsListViewComponent,
    TwoDimensionGameCardComponent,
    ThreeDimensionGameCardComponent,
    GenericGameCardComponent,
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
