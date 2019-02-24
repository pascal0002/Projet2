import { Component } from "@angular/core";
import { Router } from "@angular/router";
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
    this.errorMessage = "Le nom d'utilisateur doit être composé de 3 à 20 caractères alphanumériques";
  }

  public validateUsername(username: string): void {
    this.username = username;
    this.userLoginService
      .validateUsername(this.username)
      .subscribe(
        (isValid: boolean) => {
          this.isUsernameValid = isValid;
          this.errorMessage = "Le nom d'utilisateur doit être composé de 3 à 20 caractères alphanumériques";
        },
      );
  }

  public connect(): void {
    this.userLoginService
      .connect(this.username)
      .subscribe((isValid: boolean) => {
        this.isUsernameValid = isValid;
        this.errorMessage = "Ce nom d'utilisateur est déjà utilisé";
        if (isValid) {
          this.router.navigate(["/games_list"])
          .catch((err) => console.error(err));
        }
      });
  }
}
