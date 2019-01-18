import { Component, OnInit } from '@angular/core';
import {LISTE_FICHE_PDV_LIBRE} from './mock-liste-fiche-pdvlibre';

@Component({
  selector: 'app-fiche-pdvlibre',
  templateUrl: './fiche-pdvlibre.component.html',
  styleUrls: ['../fiche-parent/fiche-parent.component.css']
})
export class FichePDVLibreComponent implements OnInit {

  listePDVLibre = LISTE_FICHE_PDV_LIBRE;

  constructor() { }

  ngOnInit() {
  }

}
