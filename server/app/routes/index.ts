import { NextFunction, Request, Response } from "express";
import { injectable, } from "inversify";
import "reflect-metadata";
// tslint:disable-next-line
import { Message } from "../../../common/communication/message"

export module Route {

    @injectable()
    export class Index {

        private usersConnected: string[] = [];

        public validateUsername(req: Request, res: Response, next: NextFunction): void {
            const username: string = req.body.username;
            const validity: boolean = this.isUsernameUnique(username);
            res.send(validity);
        }

        public connect(req: Request, res: Response, next: NextFunction): void {
            const username: string = req.body.username;
            this.usersConnected.push(username);
            console.log(this.usersConnected);
        }

        private isUsernameUnique(username: string): boolean {
            console.log(this.usersConnected);
            console.log("typed abc : " + username);

            return !this.usersConnected.includes(username);
        }
    }
}
