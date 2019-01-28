import { NextFunction, Request, Response, Router } from "express";
import { inject, injectable } from "inversify";
import { IMessage } from "../../../common/communication/message";
import { DateService } from "../services/date.service";
import Types from "../types";

@injectable()
export class DateController {

    public constructor(@inject(Types.DateService) private dateService: DateService) { }

    public get router(): Router {
        const router: Router = Router();
        router.get("/",
                   (req: Request, res: Response, next: NextFunction) => {
                // Send the request to the service and send the response
                this.dateService.currentTime().then((time: IMessage) => {
                    res.json(time);
                });
            });

        return router;
    }
}
