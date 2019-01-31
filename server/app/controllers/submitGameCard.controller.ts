import { NextFunction, Request, Response, Router } from "express";
import { inject, injectable } from "inversify";
import "reflect-metadata";
import { FormValidatorService } from "../services/form-service/form-validator.service";
// import { DateService } from "../services/date.service";
import Types from "../types";

@injectable()
export class SubmitGameCardController {

    public constructor(/*@inject(Types.SubmitGameCard) private submit: DateService*/
        @inject(Types.FormValidatorService) private formValidatorService: FormValidatorService,
    ) { }

    public get router(): Router {
        console.log("It goes in here");
        const router: Router = Router();
        router.get("/",
                   (req: Request, res: Response, next: NextFunction) => {
                // Send the request to the service and send the response
                console.log("GET recvd");
                console.log(req.body);
            });
        router.post("/",
                    (req: Request, res: Response, next: NextFunction) => {
                // Send the request to the service and send the response
                console.log("Validating form info...");
                console.log(req.body);

                (this.formValidatorService.validateForm(req.body)) ? 
                console.log("Les informations envoyées sont bonnes, il reste à les sauvegarder.")
                : console.log("Les informations envoyées sont mauvaises.");

            });

        router.post("/:imageId", (req: Request, res: Response, next: NextFunction) => {
            // this.gameCardsService.generateDifferences(req.body.originalImage, req.body.modifiedImage);
            // res.send(req.params.imageId);
            console.log("tets");
            console.log(req.body[0].height);
        });

        return router;
    }
}
