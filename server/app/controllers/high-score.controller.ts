import { Router } from "express";
import { injectable } from "inversify";

@injectable()
export class HighScoreController {

    public constructor() { }

    public get router(): Router {
        const router: Router = Router();

        return router;
    }
}
