import { NextFunction, Request, Response, Router } from "express";
import { inject, injectable } from "inversify";

import { DifferencesGeneratorService } from "../services/differences-generator.service";
import Types from "../types";

@injectable()
export class DifferencesGeneratorController {

    public constructor(@inject(Types.DifferencesGeneratorService) private differencesGeneratorService: DifferencesGeneratorService) { }

    public get router(): Router {
        const router: Router = Router();

        router.post("image_pair/",
                    async (req: Request, res: Response, next: NextFunction) => {
                this.differencesGeneratorService.generateDifferences(req.body.originalImage, req.body.modifiedImage);
                res.send(true);
            });

        return router;
    }
}
