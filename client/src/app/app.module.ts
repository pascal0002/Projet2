import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { AppComponent } from "./app.component";
import { BasicService } from "./basic.service";
import { UserLoginService } from "./user-login.service";
import { UserLoginComponent } from "./user-login/user-login.component";
import { WebsocketService } from "./websocket.service";
@NgModule({
  declarations: [
    AppComponent,
    UserLoginComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [BasicService, UserLoginService, WebsocketService],
  bootstrap: [AppComponent],
})
export class AppModule { }
