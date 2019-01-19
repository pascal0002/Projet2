import { Component, OnInit } from '@angular/core';
import {THREE_DIMENSION_GAME_CARD_LIST} from '../3d-game-card/3d-game-card-mock-list';
import {TWO_DIMENSION_GAME_CARD_LIST} from '../2d-game-card/2d-game-card-mock-list';


@Component({
  selector: 'app-administration-view',
  templateUrl: './administration-view.component.html',
  styleUrls: [
              './administration-view.component.css',
              '../generic-game-card/generic-game-card.component.css',
              '../parts-list-view/parts-list-view.component.css'
             ]
})
export class AdministrationViewComponent implements OnInit {

  constructor() { }
  //TODO: Subscribe the lists to an observer so that the view is updated when 
  //      lists are deleted/created.

  twoDimensionGameCardListAdmin = TWO_DIMENSION_GAME_CARD_LIST;
  threeDimensionGameCardListAdmin = THREE_DIMENSION_GAME_CARD_LIST;

  

  ngOnInit() {
  }

}
