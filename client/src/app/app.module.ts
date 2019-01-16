import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { BasicService } from "./basic.service";
import { HttpClientModule } from "@angular/common/http";
import { VueListeDesPartiesComponent } from './vue-liste-des-parties/vue-liste-des-parties.component';
import { FichePDVSimpleComponent } from './fiche-pdvsimple/fiche-pdvsimple.component';

@NgModule({
  declarations: [
    AppComponent,
    VueListeDesPartiesComponent,
    FichePDVSimpleComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [BasicService],
  bootstrap: [AppComponent]
})
export class AppModule { }
