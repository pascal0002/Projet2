import { Request, Response, NextFunction } from "express";
import { Message } from "../../../common/communication/message";
import "reflect-metadata";
import { injectable, } from "inversify";

export module Route {

    @injectable()
    export class Index {

        public helloWorld(req: Request, res: Response, next: NextFunction): void {
            const message: Message = {
                title: "Hello",
                body: "World",
            };
            res.send(JSON.stringify(message));
        }

        public validateUsername(req: Request, res: Response, next: NextFunction): void {
            const username: string = req.body;
            const message: boolean = this.isUsernameUnique(username);
            res.send(JSON.stringify(message));
        }

        private isUsernameUnique(username: string): boolean {
            return true;
        }
    }
}
