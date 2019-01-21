import { Component, OnInit } from '@angular/core';
import {TWO_DIMENSION_GAME_CARD_LIST} from '../2d-game-card-mock-list';
import {THREE_DIMENSION_GAME_CARD_LIST} from '../3d-game-card-mock-list';
import {gameCard} from '../game-card';

@Component({
  selector: 'app-parts-list-view',
  templateUrl: './parts-list-view.component.html',
  styleUrls: ['./parts-list-view.component.css']
})
export class PartsListViewComponent implements OnInit {

  listes:gameCard[][] = [TWO_DIMENSION_GAME_CARD_LIST,THREE_DIMENSION_GAME_CARD_LIST];
  constructor(/*passe service, router*/) {
    //this.service
  }

  /*onclick{}
  this.router.navigate(...);
  */

  ngOnInit() {
  }

}