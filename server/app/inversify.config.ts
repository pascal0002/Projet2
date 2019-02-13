import { Container } from "inversify";
import { Application } from "./app";
import { DifferencesController } from "./controllers/differences-controller";
import { GameCardsController } from "./controllers/game-cards.controller";
import { Server } from "./server";
import { BitmapDecoder } from "./services/bitmap-decoder.service";
import { BitmapEncoder } from "./services/bitmap-encoder.service";
import { BmpFileGenerator } from "./services/bmp-file-generator.service";
import { DifferenceCounterService } from "./services/difference-counter.service";
import { DifferenceIdentificator2DService } from "./services/difference-identificator-2d.service";
import { DifferencesGeneratorService } from "./services/differences-generator.service";
import { FormValidatorService } from "./services/form-validator.service";
import { GameCardsService } from "./services/game-cards.service";
import { LoginService } from "./services/login.service";
import { WebsocketService } from "./services/websocket.service";
import Types from "./types";

const container: Container = new Container();

container.bind(Types.Server).to(Server);
container.bind(Types.Application).to(Application);
container.bind(Types.LoginService).to(LoginService);
container.bind(Types.WebsocketService).to(WebsocketService);
container.bind(Types.GameCardsController).to(GameCardsController);
container.bind(Types.GameCardsService).to(GameCardsService);
container.bind(Types.DifferencesController).to(DifferencesController);
container.bind(Types.DifferenceCounterService).to(DifferenceCounterService);
container.bind(Types.FormValidatorService).to(FormValidatorService);
container.bind(Types.DifferencesGeneratorService).to(DifferencesGeneratorService);
container.bind(Types.BmpFileGenerator).to(BmpFileGenerator);
container.bind(Types.BitmapEncoder).to(BitmapEncoder);
container.bind(Types.BitmapDecoder).to(BitmapDecoder);
container.bind(Types.DifferenceIdentificator2DService).to(DifferenceIdentificator2DService);

export { container };
