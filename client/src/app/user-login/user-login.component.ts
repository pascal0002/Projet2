import { Component } from "@angular/core";

@Component({
  selector: "app-user-login",
  templateUrl: "./user-login.component.html",
  styleUrls: ["./user-login.component.css"],
})
export class UserLoginComponent {
  public username: string;
  public usernameValid: boolean = true;
  private readonly usernameMinLength: number = 3;

  public validateUsername(u: string): void {
    const regex: RegExp = /^[0-9a-z]+$/i;

    this.username = u;
    this.usernameValid = regex.test(u) && u.length >= this.usernameMinLength;
  }
}
