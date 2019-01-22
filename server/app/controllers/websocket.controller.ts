import { NextFunction, Request, Response, Router } from "express";
import { inject, injectable } from "inversify";

import { WebsocketService } from "../services/websocket.service";
import Types from "../types";

@injectable()
export class WebsocketController {

    public constructor(@inject(Types.WebsocketService) private websocketService: WebsocketService) { }

    public get router(): Router {
        const router: Router = Router();

        router.get("/socket.io", (req: Request, res: Response, next: NextFunction) => {
            // Send the request to the service and send the response
            console.log("allo1");
            this.websocketService.listen();
        });

        router.get("/", (req: Request, res: Response, next: NextFunction) => {
            // Send the request to the service and send the response
            console.log("allo2");
        });

        return router;
    }
}
