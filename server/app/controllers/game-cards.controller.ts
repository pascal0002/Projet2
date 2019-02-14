import { NextFunction, Request, Response, Router } from "express";
import { inject, injectable } from "inversify";
import * as mongoose from "mongoose";
import { IBitmapImage } from "../../../common/communication/BitmapImage";
import {ServerConstants, Dimension} from "../../../common/communication/Constants";
import { BmpFileGenerator } from "../services/bmp-file-generator.service";
import { FormValidator2DService } from "../services/form-validator-2D.service";
import { FormValidator3DService } from "../services/form-validator-3D.service";
import { GameCardsService } from "../services/game-cards.service";
import Types from "../types";

@injectable()
export class GameCardsController {

    public constructor(@inject(Types.FormValidator2DService) private formValidator2DService: FormValidator2DService,
                       @inject(Types.FormValidator3DService) private formValidator3DService: FormValidator3DService,
                       @inject(Types.GameCardsService) private gameCardsService: GameCardsService,
                       @inject(Types.BmpFileGenerator) private bmpFileGeneratorService: BmpFileGenerator) { }

    public get router(): Router {
        const router: Router = Router();

        router.get("/2D_cards", (req: Request, res: Response, next: NextFunction) => {
            this.gameCardsService.getGameCards2D()
                .then((gameCardsDB: mongoose.Document[]) => {
                    res.json(this.gameCardsService.convertDBGameCards(gameCardsDB, Dimension.TWO_DIMENSION));
                })
                .catch((err: Error) => console.error(err));
        });

        router.get("/3D_cards", (req: Request, res: Response, next: NextFunction) => {
            this.gameCardsService.getGameCards3D()
                .then((gameCardsDB: mongoose.Document[]) => {
                    res.json(this.gameCardsService.convertDBGameCards(gameCardsDB, Dimension.THREE_DIMENSION));
                })
                .catch((err: Error) => console.error(err));
        });

        router.post("/image_pair", (req: Request, res: Response, next: NextFunction) => {
            this.formValidator2DService.validateForm(req.body) ?
                this.gameCardsService.generateDifferences(req.body.originalImage, req.body.modifiedImage)
                    .then((image: IBitmapImage) => {
                        if (this.gameCardsService.validateDifferencesImage(image)) {
                            this.bmpFileGeneratorService.generateBMPFiles(req.body, image);
                            res.json(this.gameCardsService.addGameCard2D(req.body, image));
                        } else {
                            res.status(ServerConstants.ERROR).send("Les deux images sélectionnées doivent avoir exactement 7 différences");
                        }
                    })
                    .catch((err: Error) => console.error(err)) :
                res.status(ServerConstants.ERROR).send("Les informations envoyées ne sont pas valides!");
        });

        router.post("/info_3D_game", (req: Request, res: Response, next: NextFunction) => {
            this.formValidator3DService.validateForm(req.body) ?
                res.json(this.gameCardsService.addGameCard3D(req.body)) :
                res.status(ServerConstants.ERROR).send("Les informations envoyées ne sont pas valides!");
         });

        return router;
    }
}
