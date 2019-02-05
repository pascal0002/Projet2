import { NextFunction, Request, Response, Router } from "express";
import { inject, injectable } from "inversify";
import { IBitmapImage } from "../../../common/communication/BitmapImage";
import {ServerConstants} from "../../../common/communication/Constants";
import { OpenSceneGenerator } from "../services/open-scene-generator.service";
import Types from "../types";

@injectable()
export class GameCardsController {

    public constructor(@inject(Types.OpenSceneGenerator) private openSceneGenerator: OpenSceneGenerator) { }

    public get router(): Router {
        const router: Router = Router();

        router.post("/3d_game", (req: Request, res: Response, next: NextFunction) => {
            /**/
        });

        return router;
    }
}
