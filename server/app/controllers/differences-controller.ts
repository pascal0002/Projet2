import { NextFunction, Request, Response, Router } from "express";
import { /*inject,*/ injectable } from "inversify";
//import { DifferencesGeneratorService } from "../services/differences-generator.service";
//import Types from "../types";

@injectable()
export class DifferencesController {

    public constructor(/*@inject(Types.DifferencesGeneratorService) private differencesGeneratorService: DifferencesGeneratorService*/) { }

    public get router(): Router {
        const router: Router = Router();

        router.get("/", (req: Request, res: Response, next: NextFunction) => {
         // res.send(this.differencesGeneratorService.generateDifferences(req.body.originalImage, req.body.modifiedImage));
        });

        return router;
    }
}
