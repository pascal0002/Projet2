import { Container } from "inversify";
import { Application } from "./app";
import { DifferencesController } from "./controllers/differences-controller";
import { GameCardsController } from "./controllers/game-cards.controller";
import { SceneController } from "./controllers/scene-controller";
import { Server } from "./server";
import { BitmapEncoder } from "./services/bitmap-encoder.service";
import { BmpFileGenerator } from "./services/bmp-file-generator.service";
import { DatabaseService } from "./services/database.service";
import { DifferenceCounterService } from "./services/difference-counter.service";
import { DifferenceIdentificator2D } from "./services/difference-identificator-2d.service";
import { DifferencesGeneratorService } from "./services/differences-generator.service";
import { FormValidator2DService } from "./services/form-validator-2D.service";
import { FormValidator3DService } from "./services/form-validator-3D.service";
import { GameCardsService } from "./services/game-cards.service";
import { LoginService } from "./services/login.service";
import { ModifiedSceneBuilderService } from "./services/modified-scene-builder.service";
import { OriginalSceneBuilderService } from "./services/original-scene-builder.service";
import { ScenesParameterGeneratorService } from "./services/scenes-parameter-generator.service";
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
container.bind(Types.FormValidator2DService).to(FormValidator2DService);
container.bind(Types.FormValidator3DService).to(FormValidator3DService);
container.bind(Types.DifferencesGeneratorService).to(DifferencesGeneratorService);
container.bind(Types.BmpFileGenerator).to(BmpFileGenerator);
container.bind(Types.BitmapEncoder).to(BitmapEncoder);
container.bind(Types.DifferenceIdentificator2DService).to(DifferenceIdentificator2D);
container.bind(Types.DatabaseService).to(DatabaseService);
container.bind(Types.SceneController).to(SceneController);
container.bind(Types.OriginalSceneBuilderService).to(OriginalSceneBuilderService);
container.bind(Types.ModifiedSceneBuilderService).to(ModifiedSceneBuilderService);
container.bind(Types.ScenesParameterGeneratorService).to(ScenesParameterGeneratorService);
export { container };
