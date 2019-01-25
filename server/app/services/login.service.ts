import { injectable } from "inversify";
import "reflect-metadata";

@injectable()
export class LoginService {

    private usersConnected: string[] = [];
    public readonly usernameMinLength: number = 3;
    public readonly usernameMaxLenghth: number = 20;

    public connectUser(username: string): void {
        this.usersConnected.push(username);
    }

    public validateUsername(username: string): boolean {
        const alphanumericCharacters: RegExp = /^[0-9a-z]+$/i;
        let isUsernameValid: boolean;

        isUsernameValid = alphanumericCharacters.test(username)
                          && username.length >= this.usernameMinLength
                          && username.length <= this.usernameMaxLenghth
                          && this.isUsernameUnique(username);

        return isUsernameValid;
    }

    public disconnect(username: string): void {
        const index: number = this.usersConnected.indexOf(username, 0);
        if (index > -1) {
            this.usersConnected.splice(index, 1);
        }
    }

    private isUsernameUnique(username: string): boolean {
       return !this.usersConnected.includes(username);
    }

}
