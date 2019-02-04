import { injectable } from "inversify";
import * as mongoose from "mongoose";
import "reflect-metadata";
import {ServerConstants} from "../../../common/communication/Constants";

mongoose.connect(ServerConstants.DB_URL);

@injectable()
export class UsernameService {
    public getAll(): string[] {
        return [];
    }

    public add(): void {}

    public remove(): void {}
}
