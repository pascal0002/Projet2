import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from '@angular/forms'; 
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from "./app.component";
import { BasicService } from "./basic.service";
import { HttpClientModule } from "@angular/common/http";
import { VueListeDesPartiesComponent } from './vue-liste-des-parties/vue-liste-des-parties.component';
import { FichePDVSimpleComponent } from './fiche-pdvsimple/fiche-pdvsimple.component';
import { FichePDVLibreComponent } from './fiche-pdvlibre/fiche-pdvlibre.component';
import { FicheParentComponent } from './fiche-parent/fiche-parent.component';
import { VueAdministrationComponent } from './vue-administration/vue-administration.component';

 const appRoutes: Routes =[
   { path: 'admin', component: VueAdministrationComponent },
   { path: '', component: VueListeDesPartiesComponent }
  ];

@NgModule({
  declarations: [
    AppComponent,
    VueListeDesPartiesComponent,
    FichePDVSimpleComponent,
    FichePDVLibreComponent,
    FicheParentComponent,
    VueAdministrationComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [BasicService],
  bootstrap: [AppComponent]
})
export class AppModule { }
