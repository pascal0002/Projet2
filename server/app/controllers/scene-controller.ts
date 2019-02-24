import { NextFunction, Request, Response, Router } from "express";
import { inject, injectable } from "inversify";
import * as mongoose from "mongoose";
import { Constants, Dimension } from "../../../common/communication/Constants";
import { IThreeObject } from "../../../common/communication/ThreeObject";
import { DatabaseService } from "../services/database.service";
import { GameCardsService } from "../services/game-cards.service";
import { ModifiedSceneBuilderService } from "../services/modified-scene-builder.service";
import { OriginalSceneBuilderService } from "../services/original-scene-builder.service";
import { scene3D } from "../services/scene3D-schema";
import { Scene3DService } from "../services/scenes3D-service";
import Types from "../types";

@injectable()
export class SceneController {

    public constructor(@inject(Types.OriginalSceneBuilderService) private originalSceneBuilderService: OriginalSceneBuilderService,
                       @inject(Types.ModifiedSceneBuilderService) private modifiedSceneBuilderService: ModifiedSceneBuilderService,
                       @inject(Types.Scene3DService) private scene3DService: Scene3DService,
                       @inject(Types.GameCardsService) private gameCardsService: GameCardsService,
                       @inject(Types.DatabaseService) private databaseService: DatabaseService) { }

    public get router(): Router {
        const router: Router = Router();
        router.post(Constants.IMAGE_DATA, (req: Request, res: Response, next: NextFunction) => {
            this.scene3DService.update(req.body.gameName, req.body.imageData)
                .then((document: mongoose.Document | null) => {
                    document ?
                        res.json(this.gameCardsService.convertDBGameCard(document, Dimension.THREE_DIMENSION)) :
                        res.status(Constants.ERROR).send(Constants.BAD_NUMBER_OF_DIFF_ERROR);
                })
                .catch((err: Error) => { console.error(err); });
        });

        router.post(Constants.OBJECTS, (req: Request, res: Response, next: NextFunction) => {
            const originalScene: IThreeObject[] = this.originalSceneBuilderService.createObjects(req.body.numberOfObjects);
            const modifiedScene: IThreeObject[] = this.modifiedSceneBuilderService.createModifications(
                JSON.parse(JSON.stringify(originalScene)),
                [req.body.deleteObjects, req.body.modifyObjects, req.body.addObjects]);
            this.scene3DService.addScene3D(originalScene, modifiedScene, req.body.gameName);
            res.json(originalScene);
        });

        router.post(Constants.SCENES, (req: Request, res: Response, next: NextFunction) => {
            this.databaseService.getOne(scene3D, {title : req.body.title})
            .then((scenesBD: mongoose.Document) => {
                const scenes: IThreeObject[][] = [];
                scenes.push(scenesBD.toJSON().originalScene);
                scenes.push(scenesBD.toJSON().modifiedScene);
                res.json(scenes);
            })
            .catch((err: Error) => console.error(err));
        });

        return router;
    }
}
