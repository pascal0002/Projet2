import { HttpClient, HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule, Routes } from "@angular/router";
import { BitmapReaderService } from "../app/game-card-form-2d/bitmap-reader.service";
import { FormValidator2dService } from "../app/game-card-form-2d/form-validator-2d.service";
import { AdministrationViewComponent } from "./administration-view/administration-view.component";
import { AppComponent } from "./app.component";
import { BasicService } from "./basic.service";
import { GameCardFormComponent } from "./game-card-form-2d/game-card-form-2d.component";
import { PartsListViewComponent } from "./parts-list-view/parts-list-view.component";
import { UserLoginService } from "./user-login.service";
import { UserLoginComponent } from "./user-login/user-login.component";
import { WebsocketService } from "./websocket.service";

const appRoutes: Routes = [
  { path: "", component: UserLoginComponent },
  { path: "part", component: PartsListViewComponent },
  { path: "admin", component: AdministrationViewComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    PartsListViewComponent,
    AdministrationViewComponent,
    UserLoginComponent,
    GameCardFormComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule,
  ],
  providers: [BasicService, UserLoginService, WebsocketService, HttpClient, BitmapReaderService, FormValidator2dService],
  bootstrap: [AppComponent],
})
export class AppModule { }
