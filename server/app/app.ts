import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as cors from "cors";
import * as express from "express";
import { inject, injectable } from "inversify";
import * as logger from "morgan";
//import { DateController } from "./controllers/date.controller";
//import { IndexController } from "./controllers/index.controller";
import {SubmitGameCardController} from "./controllers/submitGameCard.controller";
import { DifferencesController } from "./controllers/differences-controller";
import { GameCardsController } from "./controllers/game-cards.controller";
import Types from "./types";

@injectable()
export class Application {

    private readonly internalError: number = 500;
    public app: express.Application;

    public constructor(
       // @inject(Types.IndexController) private indexController: IndexController,
        //@inject(Types.DateController) private dateController: DateController,
        @inject(Types.SubmitGameCardController) private subitGameCardController: SubmitGameCardController,
        //@inject(Types.IndexController) private indexController: IndexController,
        //@inject(Types.DateController) private dateController: DateController,
        @inject(Types.GameCardsController) private gameCardsController: GameCardsController,
        @inject(Types.DifferencesController) private differencesController: DifferencesController,
    ) {
        this.app = express();
        console.log("constructeur");
        this.config();

        this.bindRoutes();
    }

    private config(): void {
        // Middlewares configuration
        this.app.use(logger("dev"));
        this.app.use(bodyParser.json( {limit : "10mb" }));
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(cookieParser());
        this.app.use(cors());

    }

    public bindRoutes(): void {
        console.log("dans bind routes");
        // Notre application utilise le routeur de notre API `Index`
//        this.app.use("/api/index", this.indexController.router);
//        this.app.use("/api/date", this.dateController.router);
        this.app.use("/api/saveImagePair", this.subitGameCardController.router);
        this.app.use("/api/game_cards", this.gameCardsController.router);
        this.app.use("/api/differences", this.differencesController.router);
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
