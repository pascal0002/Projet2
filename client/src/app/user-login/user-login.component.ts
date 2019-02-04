import { Component } from "@angular/core";
import { UserLoginService } from "./user-login.service";

@Component({
  selector: "app-user-login",
  templateUrl: "./user-login.component.html",
  styleUrls: ["./user-login.component.css"],
})
export class UserLoginComponent {
  public username: string;
  public isUsernameValid: boolean;

  public constructor(private userLoginService: UserLoginService) {
    this.isUsernameValid = false;
  }

  public validateUsername(username: string): void {
    this.username = username;
    this.userLoginService
      .validateUsername(this.username)
      .subscribe(
        (validity: boolean) => {this.isUsernameValid = validity; },
      );
  }

  public connect(): void {
    if (this.isUsernameValid) {
      this.userLoginService.connect(this.username);
    }
  }
}
