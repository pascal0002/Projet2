import { NextFunction, Request, Response, Router } from "express";
import { injectable } from "inversify";
import { Constants } from "../../../common/communication/Constants";

@injectable()
export class HighScoreController {

    public constructor() { }

    public get router(): Router {
        const router: Router = Router();
        router.post(Constants.BACK_SLASH, (req: Request, res: Response, next: NextFunction) => {
            res.json();
        });

        return router;
    }
}
