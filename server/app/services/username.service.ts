import { injectable } from "inversify";
import * as mongoose from "mongoose";
import "reflect-metadata";

const DB_URL: string = "mongodb://admin:admin102@ds163254.mlab.com:63254/log2990-h19-equipe102";
mongoose.connect(DB_URL);

@injectable()
export class UsernameService {
    public getAll(): string[] {
        return [];
    }

    public add(): void {}

    public remove(): void {}
}
