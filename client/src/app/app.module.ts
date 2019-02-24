import { HttpClient, HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule, Routes } from "@angular/router";
import { NgCircleProgressModule } from "ng-circle-progress";
import { BitmapReaderService } from "../app/game-card-form-2d/bitmap-reader.service";
import { FormValidator2dService } from "../app/game-card-form-2d/form-validator-2d.service";
import { AdministrationViewComponent } from "./administration-view/administration-view.component";
import { AppComponent } from "./app.component";
import { Game2DComponent } from "./game-2d/game-2d.component";
import { ImageDisplayerService } from "./game-2d/image-displayer.service";
import { Game3DComponent } from "./game-3d/game-3d.component";
import { GameCardForm2DComponent } from "./game-card-form-2d/game-card-form-2d.component";
import { GameCardForm3DComponent } from "./game-card-form-3d/game-card-form-3d.component";
import { GameViewComponent } from "./game-view/game-view.component";
import { ListOfGamesViewComponent } from "./list-of-games-view/list-of-games-view.component";
import { SceneComponent } from "./scene/scene.component";
import { SceneService } from "./scene/scene.service";
import { UserLoginComponent } from "./user-login/user-login.component";
import { UserLoginService } from "./user-login/user-login.service";
import { WebsocketService } from "./websocket.service";

const appRoutes: Routes = [
  { path: "", component: UserLoginComponent },
  { path: "games_list", component: ListOfGamesViewComponent },
  { path: "admin", component: AdministrationViewComponent },
  { path: "game_view", component: GameViewComponent },
  { path: "3d_edit", component: Game3DComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    ListOfGamesViewComponent,
    AdministrationViewComponent,
    UserLoginComponent,
    GameViewComponent,
    GameCardForm2DComponent,
    GameCardForm3DComponent,
    SceneComponent,
    Game2DComponent,
    Game3DComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule,
    NgCircleProgressModule.forRoot(),
  ],
  providers: [UserLoginService, WebsocketService, HttpClient, BitmapReaderService,
              FormValidator2dService, SceneService, ImageDisplayerService, ],
  bootstrap: [AppComponent],
})
export class AppModule { }
