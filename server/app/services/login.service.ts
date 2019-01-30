import { injectable } from "inversify";
import "reflect-metadata";

@injectable()
export class LoginService {

    private usersConnected: string[] = [];
    public readonly usernameMinLength: number = 3;
    public readonly usernameMaxLenghth: number = 20;

    public connectUser(username: string): void {
        if (this.validateUsername(username)) {
            this.usersConnected.push(username);
        }
    }

    public validateUsername(username: string): boolean {
        const alphanumericCharacters: RegExp = /^[0-9a-z]+$/i;

        return alphanumericCharacters.test(username)
               && username.length >= this.usernameMinLength
               && username.length <= this.usernameMaxLenghth
               && this.isUsernameUnique(username);
    }

    public disconnect(username: string): void {
        this.usersConnected = this.usersConnected.filter((userConnected: string) => userConnected !== username);
    }

    private isUsernameUnique(username: string): boolean {
       return !this.usersConnected.includes(username);
    }

}
