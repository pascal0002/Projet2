import { NextFunction, Request, Response, Router } from "express";
import { inject, injectable } from "inversify";
import { SnapshotWriterService } from "../services/snapshot-writer.service";
import Types from "../types";

@injectable()
export class SceneController {

    public constructor(@inject(Types.SnapshotWriterService) private snapshotWriterService: SnapshotWriterService) { }

    public get router(): Router {
        const router: Router = Router();
        router.post("/", (req: Request, res: Response, next: NextFunction) => {
            console.log(req.body.imageData);
            this.snapshotWriterService.makeSnapshot(req.body.imageData, req.body.fileName);
        });

        return router;
    }
}
