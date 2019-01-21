import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { AppComponent } from "./app.component";
import { BasicService } from "./basic.service";
import { PartsListViewComponent } from './parts-list-view/parts-list-view.component';
import { AdministrationViewComponent } from "./administration-view/administration-view.component";


@NgModule({
  declarations: [
    AppComponent,
    PartsListViewComponent,
    AdministrationViewComponent
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
