import { NextFunction, Request, Response, Router } from "express";
import { inject, injectable } from "inversify";
import { IBitmapImage } from "../../../common/communication/BitmapImage";
import { FormValidatorService } from "../services/form-service/form-validator.service";
import { GameCardsService } from "../services/game-cards.service";
import Types from "../types";

const ERROR: number = 400;
@injectable()
export class GameCardsController {

    public constructor(@inject(Types.FormValidatorService) private formValidatorService: FormValidatorService,
                       @inject(Types.GameCardsService) private gameCardsService: GameCardsService) { }

    public get router(): Router {
        const router: Router = Router();

        router.post("/image_pair", (req: Request, res: Response, next: NextFunction) => {
            this.formValidatorService.validateForm(req.body) ?
            this.gameCardsService.generateDifferences(req.body.originalImage, req.body.modifiedImage)
            .then((image: IBitmapImage) => {
                this.gameCardsService.validateDifferencesImage(image) ?
                res.json(this.gameCardsService.generateGameCard()) :
                res.status(ERROR).send("Les deux images sélectionnées doivent avoir exactement 7 différences");
            })
            .catch((err: Error) => console.error(err)) :
            res.status(ERROR).send("Les champs du formulaires doivent être valides");
        });

        return router;
    }
}
