import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { Constants } from "../../../../common/communication/Constants";
import { UserLoginService } from "./user-login.service";

@Component({
  selector: "app-user-login",
  templateUrl: "./user-login.component.html",
  styleUrls: ["./user-login.component.css"],
})
export class UserLoginComponent {
  public username: string;
  public isUsernameValid: boolean;
  public errorMessage: string;

  public constructor(private userLoginService: UserLoginService, private router: Router) {
    this.isUsernameValid = false;
    this.errorMessage = Constants.LOGIN_ERROR_NAME_SIZE;
  }

  public validateUsername(username: string): void {
    this.username = username;
    this.userLoginService
      .validateUsername(this.username)
      .subscribe(
        (isValid: boolean) => {
          this.isUsernameValid = isValid;
          this.errorMessage = Constants.LOGIN_ERROR_NAME_SIZE;
        },
      );
  }

  public connect(): void {
    this.userLoginService
      .connect(this.username)
      .subscribe((isValid: boolean) => {
        this.isUsernameValid = isValid;
        this.errorMessage = Constants.LOGIN_ERROR_NAME_IN_USE;
        if (isValid) {
          this.router.navigate([Constants.GAME_LIST_ROUTE])
          .catch((err) => console.error(err));
        }
      });
  }
}
