import { Component, OnInit } from '@angular/core';
import {TWO_DIMENSION_GAME_CARD_LIST} from './2d-game-card-mock-list';

@Component({
  selector: 'app-2d-game-card',
  templateUrl: './2d-game-card.component.html',
  styleUrls: ['../generic-game-card/generic-game-card.component.css']
})
export class TwoDimensionGameCardComponent implements OnInit {

  twoDimensionGameCardList = TWO_DIMENSION_GAME_CARD_LIST;
  

  constructor() { }

  ngOnInit() {
  }

}
