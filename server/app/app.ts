import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as cors from "cors";
import * as express from "express";
import { inject, injectable } from "inversify";
import * as logger from "morgan";
import { DifferencesController } from "./controllers/differences-controller";
import { GameCardsController } from "./controllers/game-cards.controller";
import { HighScoreController } from "./controllers/high-score.controller";
import { SceneController } from "./controllers/scene-controller";
import Types from "./types";

@injectable()
export class Application {

    private readonly internalError: number = 500;
    public app: express.Application;

    public constructor(
        @inject(Types.GameCardsController) private gameCardsController: GameCardsController,
        @inject(Types.DifferencesController) private differencesController: DifferencesController,
        @inject(Types.HighScoreController) private highScoreController: HighScoreController,
        @inject(Types.SceneController) private sceneController: SceneController,
    ) {
        this.app = express();
        this.config();

        this.bindRoutes();
    }

    private config(): void {
        // Middlewares configuration
        this.app.use(logger("dev"));
        this.app.use(bodyParser.json({ limit: "10mb" }));
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(cookieParser());
        this.app.use(cors());
    }

    public bindRoutes(): void {
        // Notre application utilise le routeur de notre API `Index`
        this.app.use("/api/game_cards", this.gameCardsController.router);
        this.app.use("/api/differences", this.differencesController.router);
        this.app.use("/api/identification", this.differencesController.router);
        this.app.use("/api/high_score", this.highScoreController.router);
        this.app.use("/api/scene", this.sceneController.router);
        this.app.use(express.static("./public"));
        this.errorHandeling();
    }

    private errorHandeling(): void {
        // Gestion des erreurs
        this.app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
            const err: Error = new Error("Not Found");
            next(err);
        });

        // development error handler
        // will print stacktrace
        if (this.app.get("env") === "development") {
            // tslint:disable-next-line:no-any
            this.app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
                res.status(err.status || this.internalError);
                res.send({
                    message: err.message,
                    error: err,
                });
            });
        }

        // production error handler
        // no stacktraces leaked to user (in production env only)
        // tslint:disable-next-line:no-any
        this.app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
            res.status(err.status || this.internalError);
            res.send({
                message: err.message,
                error: {},
            });
        });
    }
}
