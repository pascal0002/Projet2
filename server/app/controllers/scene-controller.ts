import { NextFunction, Request, Response, Router } from "express";
import { inject, injectable } from "inversify";
import { IThreeObject } from "../../../common/communication/ThreeObject";
import { GameCardsService } from "../services/game-cards.service";
import { ModifiedSceneBuilderService } from "../services/modified-scene-builder.service";
import { OriginalSceneBuilderService } from "../services/original-scene-builder.service";
import { Scene3DService } from "../services/scenes3D-service";
import Types from "../types";

@injectable()
export class SceneController {

    public constructor(@inject(Types.OriginalSceneBuilderService) private originalSceneBuilderService: OriginalSceneBuilderService,
                       @inject(Types.ModifiedSceneBuilderService) private modifiedSceneBuilderService: ModifiedSceneBuilderService,
                       @inject(Types.Scene3DService) private scene3DService: Scene3DService) { }

    public get router(): Router {
        const router: Router = Router();
        router.post("/gameCard3D/imageData", (req: Request, res: Response, next: NextFunction) => {

        });

        router.get("/objects/", (req: Request, res: Response, next: NextFunction) => {
            const originalScene: IThreeObject[] = this.originalSceneBuilderService.createObjects();
            const modifiedScene: IThreeObject[] = this.modifiedSceneBuilderService.createModifications(
                                                  JSON.parse(JSON.stringify(originalScene)));
            this.scene3DService.addScene3D(originalScene, modifiedScene, "title");
            console.log(modifiedScene.length);
            res.json(originalScene);
        });

        return router;
    }
}
