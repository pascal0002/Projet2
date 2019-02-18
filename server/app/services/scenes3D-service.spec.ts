// tslint:disable:no-any
// tslint:disable:no-magic-numbers
import * as mongoose from "mongoose";

class MockDatabaseService {

    public constructor() {
        this.connect();
    }

    private connect(): void {
        return;
    }

    public async getAll(model: mongoose.Model<mongoose.Document>): Promise<number> {
        return Promise.resolve(0);
    }

    public add(item: mongoose.Document): void {
        return;
    }

    public remove(model: mongoose.Model<mongoose.Document>, condition: Object): void {
        return;
    }

    public async countDocuments(model: mongoose.Model<mongoose.Document>, condition: Object): Promise<number> {
        return Promise.resolve(0);
    }
}