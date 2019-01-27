import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule, Routes } from "@angular/router";
import { AdministrationViewComponent } from "./administration-view/administration-view.component";
import { AppComponent } from "./app.component";
import { BasicService } from "./basic.service";
import { GameCardFormComponent } from "./game-card-form-2d/game-card-form-2d.component";
import { PartsListViewComponent } from "./parts-list-view/parts-list-view.component";
import { ReactiveFormsModule } from '@angular/forms';

const appRoutes: Routes = [

  { path: "admin", component: AdministrationViewComponent },
  { path: "", component: PartsListViewComponent },
  { path: "test", component: GameCardFormComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    PartsListViewComponent,
    AdministrationViewComponent,
    GameCardFormComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule,
  ],
  providers: [BasicService],
  bootstrap: [AppComponent],
})
export class AppModule { }
