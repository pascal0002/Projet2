import { Component, OnInit } from '@angular/core';
import {LISTE_FICHE_PDV_SIMPLE} from './mock-liste-fiche-pdvsimple';

@Component({
  selector: 'app-fiche-pdvsimple',
  templateUrl: './fiche-pdvsimple.component.html',
  styleUrls: ['../fiche-parent/fiche-parent.component.css']
})
export class FichePDVSimpleComponent implements OnInit {

  listeFichePDVSimple = LISTE_FICHE_PDV_SIMPLE;
  

  constructor() { }

  ngOnInit() {
  }

}
