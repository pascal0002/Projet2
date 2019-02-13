import { inject, injectable } from "inversify";
import "reflect-metadata";
import {ServerConstants} from "../../../common/communication/Constants";
import Types from "../types";
import { DatabaseService } from "./database.service";
import { userDB } from "./user-schema";
@injectable()
export class LoginService {

    public constructor(@inject(Types.DatabaseService) private databaseService: DatabaseService) { }

    public connectUser(username: string): void {
        if (this.validateUsername(username)) {
            this.databaseService.add(new userDB({ name: username }));
        }
    }

    public validateUsername(username: string): boolean {
        const alphanumericCharacters: RegExp = /^[0-9a-z]+$/i;

        return alphanumericCharacters.test(username)
            && username.length >= ServerConstants.MINIMUM_USERNAME_LENGTH
            && username.length <= ServerConstants.MAXIMUM_USERNAME_LENGTH;
    }

    public disconnect(username: string): void {
        this.databaseService.remove(userDB, { name: username });
    }

    public async countUsernameOccurence(username: string): Promise<number> {

        return this.databaseService.countDocuments(userDB, {name: username});
    }

}
