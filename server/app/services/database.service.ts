import { injectable } from "inversify";
import * as mongoose from "mongoose";
import "reflect-metadata";

const DB_URL: string = "mongodb://admin:admin102@ds163254.mlab.com:63254/log2990-h19-equipe102";

@injectable()
export class DatabaseService {
    private db: mongoose.Connection;

    public connect(): void {
        mongoose.connect(DB_URL);
        this.db = mongoose.connection;
        this.db.on("error", console.error.bind(console, "connection error:"));
    }

    public getAll(model: mongoose.Model): any[] {
        return [];
    }

    public add(model: mongoose.Model, item: any): void { }

    public remove(model: mongoose.Model, id: string): void {}
}
