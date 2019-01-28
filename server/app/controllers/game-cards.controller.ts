import { NextFunction, Request, Response, Router } from "express";
import { inject, injectable } from "inversify";

import { DifferencesGeneratorService } from "../services/differences-generator.service";
import Types from "../types";

@injectable()
export class GameCardsController {

    public constructor(@inject(Types.DifferencesGeneratorService) private differencesGeneratorService: DifferencesGeneratorService) { }

    public get router(): Router {
        const router: Router = Router();
        router.get("/image_pair/:imageId", (req: Request, res: Response, next: NextFunction) => {
            // Retourner les images avec le id == imageId
            res.send(req.params.imageId);
        });

        router.get("/image_pair/:imageId/difference", (req: Request, res: Response, next: NextFunction) => {
            // Retourner l'image de difference entre les images avec le id == imageId
            res.send(req.params.imageId);
        });
        router.post("/image_pair", (req: Request, res: Response, next: NextFunction) => {
                
                console.log(`Dans ${__filename}`);
                // TODO: Appeler le Game Card service, qui lui va faire un appel HTTP vers un microservice qui fait:
                // this.differencesGeneratorService.generateDifferences(req.body.originalImage, req.body.modifiedImage);
                
                res.send(true);
            });

        return router;
    }
}
