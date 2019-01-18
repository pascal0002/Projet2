import { Request, Response, NextFunction } from "express";
import "reflect-metadata";
import { Message } from "../../../common/communication/message" // NE PAS SUPPRIMER
import { injectable, } from "inversify";

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
        }

        private isUsernameUnique(username: string): boolean {
            console.log(this.usersConnected);
            console.log(username);

            return !this.usersConnected.includes(username);
        }
    }
}
