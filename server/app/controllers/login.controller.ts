import { NextFunction, Request, Response, Router } from "express";
import { inject, injectable } from "inversify";

import { LoginService } from "../services/login.service";
import Types from "../types";

@injectable()
export class LoginController {

    public constructor(@inject(Types.LoginService) private loginService: LoginService) { }

    public get router(): Router {
        const router: Router = Router();

        router.post("/", (req: Request, res: Response, next: NextFunction) => {
            // Send the request to the service and send the response
            this.loginService.validateUsername(req, res, next);
        });

        router.post("/connect", (req: Request, res: Response, next: NextFunction) => {
            // Send the request to the service and send the response
            this.loginService.connect(req, res, next);
        });

        return router;
    }
}
