import { inject, injectable } from "inversify";
import "reflect-metadata";
import Types from "../types";
import { DatabaseService } from "./database.service";
import { username } from "./usernameSchema";
@injectable()
export class UsernameService {

    public constructor(@inject(Types.DatabaseService) private databaseService: DatabaseService) {
    }

    public getAllUsername(): string[] {
        return this.databaseService.getAll(username);
    }

    public addUsername(newUser: string): void {
        this.databaseService.add(username, newUser);
    }

    public removeUsername(newUser: string): void {
        this.databaseService.remove(username, newUser);
    }
}
