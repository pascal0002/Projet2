import { injectable } from "inversify";
import "reflect-metadata";

@injectable()
export class LoginService {

    private usersConnected: string[] = [];

    public connectUser(username: string): void {
        this.usersConnected.push(username);
    }

    public isUsernameUnique(username: string): boolean {
        console.log(this.usersConnected);
        console.log("typed : " + username);

        return !this.usersConnected.includes(username);
    }

    public disconnect(username: string): void {
        console.log(this.usersConnected);
        const index: number = this.usersConnected.indexOf(username, 0);
        if (index > -1) {
            this.usersConnected.splice(index, 1);
        }
        console.log(this.usersConnected);
    }

}
