import { HttpClient, HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule, Routes } from "@angular/router";
import { BitmapReaderService } from "../app/game-card-form-2d/bitmap-reader.service";
import { FormValidator2dService } from "../app/game-card-form-2d/form-validator-2d.service";
import { AdministrationViewComponent } from "./administration-view/administration-view.component";
import { AppComponent } from "./app.component";
import { GameCardForm2DComponent } from "./game-card-form-2d/game-card-form-2d.component";
import { GameCardForm3DComponent } from "./game-card-form-3d/game-card-form-3d.component";
import { ListOfGamesViewComponent } from "./list-of-games-view/list-of-games-view.component";
import { OpenSceneConstructorComponent } from "./open-scene-constructor/open-scene-constructor.component";
import { OpenSceneConstructorService } from "./open-scene-constructor/open-scene-constructor.service";
import { UserLoginComponent } from "./user-login/user-login.component";
import { UserLoginService } from "./user-login/user-login.service";
import { WebsocketService } from "./websocket.service";

const appRoutes: Routes = [
  { path: "", component: UserLoginComponent },
  { path: "games_list", component: ListOfGamesViewComponent },
  { path: "admin", component: AdministrationViewComponent },
  { path: "3d_edit", component: OpenSceneConstructorComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    ListOfGamesViewComponent,
    AdministrationViewComponent,
    UserLoginComponent,
    GameCardForm2DComponent,
    GameCardForm3DComponent,
    OpenSceneConstructorComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule,
  ],
  providers: [UserLoginService, WebsocketService, HttpClient, BitmapReaderService, FormValidator2dService, OpenSceneConstructorService],
  bootstrap: [AppComponent],
})
export class AppModule { }
