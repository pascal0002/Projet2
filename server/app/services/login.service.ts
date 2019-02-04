import { inject, injectable } from "inversify";
import "reflect-metadata";
import {ServerConstants} from "../../../common/communication/Constants";
import Types from "../types";
import {UsernameService} from "./username.service";
@injectable()
export class LoginService {

    private usersConnected: string[];

    public constructor(@inject(Types.UsernameService) private usernameService: UsernameService) {
        this.usersConnected = [];
    }

    public connectUser(username: string): void {
        if (this.validateUsername(username)) {
            this.usersConnected.push(username);
            this.usernameService.addUsername(username);
        }
    }

    public validateUsername(username: string): boolean {
        const alphanumericCharacters: RegExp = /^[0-9a-z]+$/i;

        return alphanumericCharacters.test(username)
            && username.length >= ServerConstants.MINIMUM_USERNAME_LENGTH
            && username.length <= ServerConstants.MAXIMUM_USERNAME_LENGTH
            && this.isUsernameUnique(username);
    }

    public disconnect(username: string): void {
        this.usersConnected = this.usersConnected.filter((userConnected: string) => userConnected !== username);
    }

    public isUsernameUnique(username: string): boolean {
        return !this.usersConnected.includes(username);
    }

}
