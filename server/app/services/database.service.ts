import { injectable } from "inversify";
import * as mongoose from "mongoose";
import "reflect-metadata";
import {ServerConstants} from "../../../common/communication/Constants";

@injectable()
export class DatabaseService {
    private db: mongoose.Connection;

    public connect(): void {
        mongoose.connect(ServerConstants.DB_URL);
        this.db = mongoose.connection;
        this.db.on("error", console.error.bind(console, "connection error:"));
    }

    public getAll(model: mongoose.Model): any[] {
        return [];
    }

    public add(model: mongoose.Model, item: any): void { }

    public remove(model: mongoose.Model, id: string): void {}
}
