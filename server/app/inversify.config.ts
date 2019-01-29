import { Container } from "inversify";
import { Application } from "./app";
import { DateController } from "./controllers/date.controller";
import { DifferencesController } from "./controllers/differences-controller";
import { GameCardsController } from "./controllers/game-cards.controller";
import { IndexController } from "./controllers/index.controller";
import { Server } from "./server";
import { DateService } from "./services/date.service";
//import { DifferencesGeneratorService } from "./services/differences-generator.service";
import { GameCardsService } from "./services/game-cards.service";
import { IndexService } from "./services/index.service";
import { LoginService } from "./services/login.service";
import { WebsocketService } from "./services/websocket.service";
import {SubmitGameCardController} from "./controllers/submitGameCard.controller";
// import { BitmapDecoderService } from "../../client/src/app/game-card-form-2d/bitmap-decoder.service";
import Types from "./types";

const container: Container = new Container();

container.bind(Types.Server).to(Server);
container.bind(Types.Application).to(Application);
container.bind(Types.IndexController).to(IndexController);
container.bind(Types.IndexService).to(IndexService);
container.bind(Types.DateController).to(DateController);
container.bind(Types.DateService).to(DateService);
container.bind(Types.LoginService).to(LoginService);
container.bind(Types.SubmitGameCardController).to(SubmitGameCardController);
container.bind(Types.WebsocketService).to(WebsocketService);
//container.bind(Types.DifferencesGeneratorService).to(DifferencesGeneratorService);
container.bind(Types.GameCardsController).to(GameCardsController);
container.bind(Types.GameCardsService).to(GameCardsService);
container.bind(Types.DifferencesController).to(DifferencesController);

export { container };
