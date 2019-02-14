import { NextFunction, Request, Response, Router } from "express";
import { inject, injectable } from "inversify";
import { IThreeObject } from "../../../common/communication/ThreeObject";
import { ModifiedSceneBuilderService } from "../services/modified-scene-builder.service";
import { OriginalSceneBuilderService } from "../services/original-scene-builder.service";
import Types from "../types";

@injectable()
export class SceneController {

    public constructor(@inject(Types.OriginalSceneBuilderService) private originalSceneBuilderService: OriginalSceneBuilderService,
                       @inject(Types.ModifiedSceneBuilderService) private modifiedSceneBuilderService: ModifiedSceneBuilderService) { }

    public get router(): Router {
        const router: Router = Router();
        router.post("/gameCard3D/", (req: Request, res: Response, next: NextFunction) => {
            // envoi de la game card 3D a la bdd
        });

        router.get("/objects/", (req: Request, res: Response, next: NextFunction) => {
            const originalScene: IThreeObject[] = this.originalSceneBuilderService.createObjects();
            // envoyer la scene originale a la bdd
            const modifiedScene: IThreeObject[] = this.modifiedSceneBuilderService.createModifications(
                                                  JSON.parse(JSON.stringify(originalScene)));
            // envoyer la scene modifiée a la bdd
            console.log(modifiedScene.length);
            res.json(originalScene);
        });

        return router;
    }
}
