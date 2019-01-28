import { Container } from "inversify";
import { Application } from "./app";
import { DateController } from "./controllers/date.controller";
import { DifferencesGeneratorController } from "./controllers/differences-generator.controller";
import { IndexController } from "./controllers/index.controller";
import { Server } from "./server";
import { DateService } from "./services/date.service";
import { DifferencesGeneratorService } from "./services/differences-generator.service";
import { IndexService } from "./services/index.service";
import { LoginService } from "./services/login.service";
import { WebsocketService } from "./services/websocket.service";
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
container.bind(Types.WebsocketService).to(WebsocketService);
container.bind(Types.DifferencesGeneratorService).to(DifferencesGeneratorService);
container.bind(Types.DifferencesGeneratorController).to(DifferencesGeneratorController);
// container.bind(Types.BitmapDecoderService).to(BitmapDecoderService);

export { container };
