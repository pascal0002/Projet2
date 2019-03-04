import { NextFunction, Request, Response, Router } from "express";
import { inject, injectable} from "inversify";
import { Constants } from "../../../common/communication/Constants";
import { HighScoreService } from "../services/high-score.service";
import Types from "../types";

@injectable()
export class HighScoreController {

    public constructor(@inject(Types.HighScoreService) private highScoreService: HighScoreService) {}

    public get router(): Router {
        const router: Router = Router();
        router.post(Constants.BACK_SLASH, (req: Request, res: Response, next: NextFunction) => {
            res.json(this.highScoreService.updateGameCard());
        });

        return router;
    }
}
