import { NextFunction, Request, Response, Router } from "express";
import { /*inject,*/ injectable } from "inversify";
//import { DateService } from "../services/date.service";
//import Types from "../types";
import "reflect-metadata";


@injectable()
export class SubmitGameCardController {

    public constructor(/*@inject(Types.SubmitGameCard) private submit: DateService*/) { }

    public get router(): Router {
        console.log("It goes in here");
        const router: Router = Router();

        //But not down here...
        router.get("/",
                   (req: Request, res: Response, next: NextFunction) => {
                // Send the request to the service and send the response
                    console.log("GET recvd");
                    console.log(req.body);
                });
           
        router.post("/",
                (req: Request, res: Response, next: NextFunction) => {
             // Send the request to the service and send the response
                 console.log("POST recvd");
                 console.log(req.body);
                 
             });

             return router;
    }
}
