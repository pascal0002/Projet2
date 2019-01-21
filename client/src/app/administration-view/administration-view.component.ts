import { Component, OnInit } from '@angular/core';
import {THREE_DIMENSION_GAME_CARD_LIST} from '../3d-game-card-mock-list';
import {TWO_DIMENSION_GAME_CARD_LIST} from '../2d-game-card-mock-list';
import {gameCard} from '../game-card';
import {FormHandler2dService} from '../game-card-form-2d/form-handler-2d.service';
 
@Component({
  selector: 'app-administration-view',
  templateUrl: './administration-view.component.html',
  styleUrls: [
              './administration-view.component.css',
              '../parts-list-view/parts-list-view.component.css',
              '../parts-list-view/parts-list-view.component.css'
             ]
})
export class AdministrationViewComponent implements OnInit {

  constructor(private formHandler2D: FormHandler2dService) { }
  //TODO: Subscribe the lists to an observer so that the view is updated when 
  //      lists are deleted/created.

  listes:gameCard[][] = [TWO_DIMENSION_GAME_CARD_LIST,THREE_DIMENSION_GAME_CARD_LIST];

  openForm2D(){
    this.formHandler2D.openForm();
  }
  ngOnInit() { 
  }
}
