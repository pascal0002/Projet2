import { NextFunction, Request, Response, Router } from "express";
import { inject, injectable } from "inversify";
import { BitmapImage } from "../../../common/communication/BitmapImage";
import { GameCardsService } from "../services/game-cards.service";
import Types from "../types";

@injectable()
export class GameCardsController {

    public constructor(@inject(Types.GameCardsService) private gameCardsService: GameCardsService) { }

    public get router(): Router {
        const router: Router = Router();

        router.post("/image_pair", (req: Request, res: Response, next: NextFunction) => {
            this.gameCardsService.generateDifferences(req.body.originalImage, req.body.modifiedImage)
            .then((image: BitmapImage) => {res.json(this.gameCardsService.validateDifferencesImage(image)); });
        });

        return router;
    }
}
