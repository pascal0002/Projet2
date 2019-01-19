import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { AppComponent } from "./app.component";
import { BasicService } from "./basic.service";


@NgModule({
  declarations: [
    AppComponent,
      ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [BasicService],
  bootstrap: [AppComponent],
})
export class AppModule {}
