import { inject, injectable } from "inversify";
import * as mongoose from "mongoose";
import "reflect-metadata";
import Types from "../types";
import { DatabaseService } from "./database.service";
import { user } from "./usernameSchema";
@injectable()
export class UsernameService {

    public constructor(@inject(Types.DatabaseService) private databaseService: DatabaseService) {
    }

    public getAllUsername(): string[] {
        return this.databaseService.getAll(user);
    }

    public addUsername(username: string): void {
        const newUser: mongoose.Document = new user({ name: username });
        console.log(newUser);
        this.databaseService.add(newUser);
    }

    public removeUsername(username: string): void {
        this.databaseService.remove(user, username);
    }
}
