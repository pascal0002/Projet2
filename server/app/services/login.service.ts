import { inject, injectable } from "inversify";
import "reflect-metadata";
import {ServerConstants} from "../../../common/communication/Constants";
import Types from "../types";
import { DatabaseService } from "./database.service";
import { user } from "./usernameSchema";
@injectable()
export class LoginService {

    public constructor(@inject(Types.DatabaseService) private databaseService: DatabaseService) { }

    public connectUser(username: string): void {
        if (this.validateUsername(username)) {
            this.databaseService.add(new user({ name: username }));
        }
    }

    public validateUsername(username: string): boolean {
        const alphanumericCharacters: RegExp = /^[0-9a-z]+$/i;

        return alphanumericCharacters.test(username)
            && username.length >= ServerConstants.MINIMUM_USERNAME_LENGTH
            && username.length <= ServerConstants.MAXIMUM_USERNAME_LENGTH;
    }

    public disconnect(username: string): void {
        this.databaseService.remove(user, { name: username });
    }

    public isUsernameUnique(username: string): Promise<boolean> {

        return new Promise((resolve: Function) => {
            resolve(this.databaseService.countDocuments(user, {name: username})
                .then((val: number) => {
                    return (val === 0);
                }));
        });
    }

}
