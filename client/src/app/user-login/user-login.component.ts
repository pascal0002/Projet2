import { Component, OnInit } from "@angular/core";
import { UserLoginService } from "../user-login.service";

@Component({
  selector: "app-user-login",
  templateUrl: "./user-login.component.html",
  styleUrls: ["./user-login.component.css"],
})
export class UserLoginComponent implements OnInit {
  public username: string;
  public usernameValid: boolean = false;
  public readonly usernameMinLength: number = 3;
  public readonly usernameMaxLenght: number = 20;

  public constructor(private userLoginService: UserLoginService) { }

  public validateUsername(u: string): void {
    const regex: RegExp = /^[0-9a-z]+$/i;

    this.username = u;

    this.usernameValid = regex.test(u) && u.length >= this.usernameMinLength;
    if (this.usernameValid) {
      this.userLoginService
        .validateUsername(this.username)
        .subscribe(
          (validity: boolean) => { console.log(validity); this.usernameValid = validity; },
        );
    }
  }

  public connect(): void {
    if (this.usernameValid) {
      console.log("Trying to connect");
      this.userLoginService.connect(this.username);
    }
  }

  public ngOnInit() { }
}
