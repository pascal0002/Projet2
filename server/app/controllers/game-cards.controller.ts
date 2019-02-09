import { NextFunction, Request, Response, Router } from "express";
import { inject, injectable } from "inversify";
import { IBitmapImage } from "../../../common/communication/BitmapImage";
import {ServerConstants} from "../../../common/communication/Constants";
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

        router.post("/image_pair", (req: Request, res: Response, next: NextFunction) => {
            this.formValidator2DService.validateForm(req.body) ?
                this.gameCardsService.generateDifferences(req.body.originalImage, req.body.modifiedImage)
                    .then((image: IBitmapImage) => {
                        if (this.gameCardsService.validateDifferencesImage(image)) {
                            this.bmpFileGeneratorService.generateBMPFiles(req.body, image);
                            res.json(this.gameCardsService.generateGameCard(req.body));
                        } else {
                            res.status(ServerConstants.ERROR).send("Les deux images sélectionnées doivent avoir exactement 7 différences");
                        }
                    })
                    .catch((err: Error) => console.error(err)) :
                res.status(ServerConstants.ERROR).send("Les champs du formulaires doivent être valides");
        });

        router.post("/info_3D_game", (req: Request, res: Response, next: NextFunction) => {
            this.formValidator3DService.validateForm(req.body) ?
            console.log(req.body)
            :
            res.status(ServerConstants.ERROR).send("Les informations envoyées ne sont pas valides!");
         });

        return router;
    }
}
