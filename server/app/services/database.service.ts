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

    public getAll(model: mongoose.Model<mongoose.Document>): any[] {
        return [];
    }

    public add(item: mongoose.Document): void {
        console.log("allo");
        item.save((err: any) => {
            if (err) { return console.error(err); }
            console.log(item);
          });
    }

    public remove(model: mongoose.Model<mongoose.Document>, id: string): void {}
}
