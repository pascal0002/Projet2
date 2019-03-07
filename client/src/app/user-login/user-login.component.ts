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
  public isUsernameValid: boolean;
  public errorMessage: string;

  public constructor(public userLoginService: UserLoginService, private router: Router) {
    this.isUsernameValid = false;
    this.errorMessage = Constants.LOGIN_ERROR_NAME_SIZE;
  }

  public validateUsername(username: string): void {
    this.userLoginService
      .validateUsername(username)
      .subscribe(
        (isValid: boolean) => {
          this.isUsernameValid = isValid;
          this.errorMessage = Constants.LOGIN_ERROR_NAME_SIZE;
        },
      );
  }

  public connect(): void {
    this.userLoginService
      .connect()
      .subscribe((isValid: boolean) => {
        this.isUsernameValid = isValid;
        this.errorMessage = Constants.LOGIN_ERROR_NAME_IN_USE;
        if (isValid) {
          this.router.navigate([Constants.GAME_LIST_URL])
          .catch((err) => console.error(err));
        }
      });
  }
}
