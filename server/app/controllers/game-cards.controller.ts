import { NextFunction, Request, Response, Router } from "express";
import { inject, injectable } from "inversify";
import { IBitmapImage } from "../../../common/communication/BitmapImage";
import { ServerConstants } from "../../../common/communication/Constants";
import { BmpFileGenerator } from "../services/bmp-file-generator.service";
import { DifferenceIdentificator2DService } from "../services/difference-identificator-2d.service";
import { FormValidatorService } from "../services/form-validator.service";
import { GameCardsService } from "../services/game-cards.service";
import Types from "../types";

@injectable()
export class GameCardsController {

    public constructor(@inject(Types.FormValidatorService) private formValidatorService: FormValidatorService,
                       @inject(Types.GameCardsService) private gameCardsService: GameCardsService,
                       @inject(Types.BmpFileGenerator) private bmpFileGeneratorService: BmpFileGenerator,
                       @inject(Types.DifferenceIdentificator2DService) private differenceIdentificator2DService:
                                                                            DifferenceIdentificator2DService) { }

    public get router(): Router {
        const router: Router = Router();

        router.post("/image_pair", (req: Request, res: Response, next: NextFunction) => {
            this.formValidatorService.validateForm(req.body) ?
                this.gameCardsService.generateDifferences(req.body.originalImage, req.body.modifiedImage)
                    .then((imageOfDifferences: IBitmapImage) => {
                        if (this.gameCardsService.validateDifferencesImage(imageOfDifferences)) {
                            this.bmpFileGeneratorService.generateBMPFiles(req.body, imageOfDifferences);
                            res.json(this.gameCardsService.generateGameCard(req.body));
                            this.differenceIdentificator2DService.differenceImgTest = imageOfDifferences; // test
                        } else {
                            res.status(ServerConstants.ERROR).send("Les deux images sélectionnées doivent avoir exactement 7 différences");
                        }
                    })
                    .catch((err: Error) => console.error(err)) :
                res.status(ServerConstants.ERROR).send("Les champs du formulaires doivent être valides");
        });

        return router;
    }
}
