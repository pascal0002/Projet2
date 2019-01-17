import { Component, OnInit } from '@angular/core';
import {LISTE_FICHE_PDV_SIMPLE} from './liste-fiche-pdvsimple';

@Component({
  selector: 'app-fiche-pdvsimple',
  templateUrl: './fiche-pdvsimple.component.html',
  styleUrls: ['./fiche-pdvsimple.component.css']
})
export class FichePDVSimpleComponent implements OnInit {

  listeFichePDVSimple = LISTE_FICHE_PDV_SIMPLE;
  

  constructor() { }

  ngOnInit() {
  }

}
