import { NextFunction, Request, Response, Router } from "express";
import { inject, injectable } from "inversify";
import { OriginalSceneBuilderService } from "../services/original-scene-builder.service";
import { SnapshotWriterService } from "../services/snapshot-writer.service";
import Types from "../types";

@injectable()
export class SceneController {

    public constructor(@inject(Types.SnapshotWriterService) private snapshotWriterService: SnapshotWriterService,
                       @inject(Types.OriginalSceneBuilderService) private originalSceneBuilderService: OriginalSceneBuilderService) { }

    public get router(): Router {
        const router: Router = Router();
        router.post("/snapshot/", (req: Request, res: Response, next: NextFunction) => {
            this.snapshotWriterService.makeSnapshot(req.body.imageData, req.body.fileName);
        });

        router.get("/objects/", (req: Request, res: Response, next: NextFunction) => {
            res.json(this.originalSceneBuilderService.createObjects());
        });

        return router;
    }
}
