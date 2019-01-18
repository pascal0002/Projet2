import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from '@angular/forms'; 


import { AppComponent } from "./app.component";
import { BasicService } from "./basic.service";
import { HttpClientModule } from "@angular/common/http";
import { VueListeDesPartiesComponent } from './vue-liste-des-parties/vue-liste-des-parties.component';
import { FichePDVSimpleComponent } from './fiche-pdvsimple/fiche-pdvsimple.component';
import { FichePDVLibreComponent } from './fiche-pdvlibre/fiche-pdvlibre.component';
import { FicheParentComponent } from './fiche-parent/fiche-parent.component';

@NgModule({
  declarations: [
    AppComponent,
    VueListeDesPartiesComponent,
    FichePDVSimpleComponent,
    FichePDVLibreComponent,
    FicheParentComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [BasicService],
  bootstrap: [AppComponent]
})
export class AppModule { }
