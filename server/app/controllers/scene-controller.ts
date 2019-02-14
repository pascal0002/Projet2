import { NextFunction, Request, Response, Router } from "express";
import { inject, injectable } from "inversify";
import { IThreeObject } from "../../../common/communication/ThreeObject";
import { ModifiedSceneBuilderService } from "../services/modified-scene-builder.service";
import { OriginalSceneBuilderService } from "../services/original-scene-builder.service";
import { SnapshotWriterService } from "../services/snapshot-writer.service";
import Types from "../types";

@injectable()
export class SceneController {

    public constructor(@inject(Types.SnapshotWriterService) private snapshotWriterService: SnapshotWriterService,
                       @inject(Types.OriginalSceneBuilderService) private originalSceneBuilderService: OriginalSceneBuilderService,
                       @inject(Types.ModifiedSceneBuilderService) private modifiedSceneBuilderService: ModifiedSceneBuilderService) { }

    public get router(): Router {
        const router: Router = Router();
        router.post("/snapshot/", (req: Request, res: Response, next: NextFunction) => {
            this.snapshotWriterService.makeSnapshot(req.body.imageData, req.body.fileName);
        });

        router.get("/objects/", (req: Request, res: Response, next: NextFunction) => {
            const originalScene: IThreeObject[] = this.originalSceneBuilderService.createObjects();
            // envoyer la scene originale a la bdd
            const modifiedScene: IThreeObject[] = this.modifiedSceneBuilderService.createModifications(
                                                  JSON.parse(JSON.stringify(originalScene)));
            // envoyer la scene modifiée a la bdd
            res.json(originalScene);
        });

        return router;
    }
}
