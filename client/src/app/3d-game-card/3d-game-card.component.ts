import { Component, OnInit } from '@angular/core';
import {THREE_DIMENSION_GAME_CARD_LIST} from './3d-game-card-mock-list';

@Component({
  selector: 'app-3d-game-card',
  templateUrl: './3d-game-card.component.html',
  styleUrls: ['../generic-game-card/generic-game-card.component.css']
})
export class ThreeDimensionGameCardComponent implements OnInit {

  threeDimensionGameCardList = THREE_DIMENSION_GAME_CARD_LIST;

  constructor() { }

  ngOnInit() {
  }

}
