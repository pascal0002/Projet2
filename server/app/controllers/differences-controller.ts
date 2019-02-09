import { NextFunction, Request, Response, Router } from "express";
import { inject, injectable } from "inversify";
import { DifferenceIdentificator2DService } from "../services/difference-identificator-2d.service";
import { DifferencesGeneratorService } from "../services/differences-generator.service";
import Types from "../types";

@injectable()
export class DifferencesController {

    public constructor(@inject(Types.DifferencesGeneratorService) private differencesGeneratorService: DifferencesGeneratorService,
                       @inject(Types.DifferenceIdentificator2DService) private differenceIdentificator2DService:
                                                                                DifferenceIdentificator2DService) { }

    public get router(): Router {
        const router: Router = Router();
        router.post("/", (req: Request, res: Response, next: NextFunction) => {
            res.json(this.differencesGeneratorService.generateDifferences(req.body.originalImage, req.body.modifiedImage));
        });
        router.post("/difference_validator", (req: Request, res: Response, next: NextFunction) => {
            this.differenceIdentificator2DService.clickPosition = req.body;
            this.differenceIdentificator2DService.confirmIdentification(this.differenceIdentificator2DService.clickPosition,
                                                                        this.differenceIdentificator2DService.differenceImgTest,
                                                                        this.differenceIdentificator2DService.differenceImgTest);
        });

        return router;
    }
}
