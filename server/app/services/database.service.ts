import { injectable } from "inversify";
import * as mongoose from "mongoose";
import "reflect-metadata";
import {ServerConstants} from "../../../common/communication/Constants";

@injectable()
export class DatabaseService {

    public constructor() {
        this.connect();
    }

    private connect(): void {
        mongoose.connect(ServerConstants.DB_URL, { useNewUrlParser: true });
    }

    public async getAll(model: mongoose.Model<mongoose.Document>): Promise<mongoose.Document[]> {
        return model.find((err: Error) => {
            if (err) {
                return console.error(err);
            }
        });
    }

    public add(item: mongoose.Document): void {
        item.save((err: Error) => {
            if (err) {
                return console.error(err);
            }
        });
    }

    public remove(model: mongoose.Model<mongoose.Document>, condition: Object): void {
        model.deleteOne(condition, (err: Error) => {
            if (err) {
                return console.error(err);
            }
        });
    }

    public async countDocuments(model: mongoose.Model<mongoose.Document>, condition: Object): Promise<number> {
        return model.countDocuments(condition, (err: Error) => {
            if (err) {
                console.error(err);
            }
        });
    }
}
