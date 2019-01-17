import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-user-login",
  templateUrl: "./user-login.component.html",
  styleUrls: ["./user-login.component.css"],
})
export class UserLoginComponent implements OnInit {
  public username: string;
  public usernameValid: boolean = true;
  public readonly usernameMinLength: number = 3;
  public readonly usernameMaxLenght: number = 20;

  public validateUsername(u: string): void {
    const regex: RegExp = /^[0-9a-z]+$/i;

    this.username = u;
    this.usernameValid = regex.test(u) && u.length >= this.usernameMinLength;
  }

  public ngOnInit(): void {
    // a
  }
}
