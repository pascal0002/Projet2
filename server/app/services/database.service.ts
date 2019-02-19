import { injectable } from "inversify";
import * as mongoose from "mongoose";
import "reflect-metadata";
import {Constants} from "../../../common/communication/Constants";

@injectable()
export class DatabaseService {

    public constructor() {
        this.connect();
    }

    private connect(): void {
        mongoose.connect(Constants.DB_URL, { useNewUrlParser: true })
        .catch((err: Error) => console.error(err));
    }

    public async getAll(model: mongoose.Model<mongoose.Document>): Promise<mongoose.Document[]> {
        return model.find();
    }

    public add(item: mongoose.Document): void {
        item.save()
        .catch((err: Error) => console.error(err));
    }

    public remove(model: mongoose.Model<mongoose.Document>, condition: Object): void {
        model.deleteOne(condition, (err: Error) => {
            if (err) { console.error(err); }
        });
    }

    public async countDocuments(model: mongoose.Model<mongoose.Document>, condition: Object): Promise<number> {
        return model.countDocuments(condition);
    }

    public async updateOne(model: mongoose.Model<mongoose.Document>, condition: Object, modification: Object):
                           Promise<mongoose.Document | null> {
        return model.findOneAndUpdate(condition, modification, {new: true});
    }

    public async getOne(model: mongoose.Model<mongoose.Document>, condition: Object):
                           Promise<mongoose.Document | null> {
        return model.findOne(condition);
    }
}
