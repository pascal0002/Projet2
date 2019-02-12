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
import { GameView2DComponent } from "./game-view-2d/game-view-2d.component";
import { ListOfGamesViewComponent } from "./list-of-games-view/list-of-games-view.component";
import { UserLoginComponent } from "./user-login/user-login.component";
import { UserLoginService } from "./user-login/user-login.service";
import { WebsocketService } from "./websocket.service";

const appRoutes: Routes = [
  { path: "", component: UserLoginComponent },
  { path: "games_list", component: ListOfGamesViewComponent },
  { path: "admin", component: AdministrationViewComponent },
  { path: "game_view_2d", component: GameView2DComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    ListOfGamesViewComponent,
    AdministrationViewComponent,
    UserLoginComponent,
    GameView2DComponent,
    GameCardForm2DComponent,
    GameCardForm3DComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule,
  ],
  providers: [UserLoginService, WebsocketService, HttpClient, BitmapReaderService, FormValidator2dService],
  bootstrap: [AppComponent],
})
export class AppModule { }
