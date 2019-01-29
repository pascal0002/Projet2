import { NextFunction, Request, Response, Router } from "express";
import { /*inject,*/ injectable } from "inversify";
//import { GameCardsService } from "../services/game-cards.service";
//import Types from "../types";

@injectable()
export class GameCardsController {

    public constructor(/*@inject(Types.GameCardsService) private gameCardsService: GameCardsService*/) { }

    public get router(): Router {
        const router: Router = Router();

        router.post("/image_pair/:imageId", (req: Request, res: Response, next: NextFunction) => {
            //this.gameCardsService.generateDifferences(req.body.originalImage, req.body.modifiedImage);
            //res.send(req.params.imageId);
            console.log("tets");
        });

        router.get("/image_pair/:imageId/difference", (req: Request, res: Response, next: NextFunction) => {
            // Retourner l'image de difference entre les images avec le id == imageId
            res.send(req.params.imageId);
        });
        

        return router;
    }
}
