import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import {RouterModule, Routes} from "@angular/router";
import { AdministrationViewComponent } from "./administration-view/administration-view.component";
import { AppComponent } from "./app.component";
import { BasicService } from "./basic.service";
import { GameCardFormComponent } from "./game-card-form-2d/game-card-form-2d.component";
import { PartsListViewComponent } from "./parts-list-view/parts-list-view.component";
import { UserLoginService } from "./user-login.service";
import { UserLoginComponent } from "./user-login/user-login.component";
import { WebsocketService } from "./websocket.service";

const appRoutes: Routes = [
    {path: "admin", component: AdministrationViewComponent},
    {path: "", component: PartsListViewComponent},
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
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [BasicService, UserLoginService, WebsocketService],
  bootstrap: [AppComponent],
})
export class AppModule {}
