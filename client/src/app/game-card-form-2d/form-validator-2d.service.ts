import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {ClientConstants} from "../../../../common/communication/Constants";
import { IFormInfo2D } from "../../../../common/communication/FormInfo2D";
import { GameCard } from "../../../../common/communication/game-card";
import { ListOfGamesService } from "../list-of-games-view/list-of-games.service";

@Injectable({
  providedIn: "root",
})

export class FormValidator2dService {

  public constructor(private http: HttpClient, private listOfGameService: ListOfGamesService) { }

  public validTitle(title: string): boolean {
      return (title.length >= ClientConstants.MIN_TITLE_LENGTH && title.length <= ClientConstants.MAX_TITLE_LENGTH);
  }

  public validImageDimensions(height: number, width: number): boolean {
    return (height === ClientConstants.VALID_BMP_HEIGHT && width === ClientConstants.VALID_BMP_WIDTH);
  }

  public validBitDepth(bitDepth: number): boolean {
    return (bitDepth === ClientConstants.VALID_BITS_PER_PIXEL);
  }

  public validBMPExtension(extension: string): boolean {
    return (extension.split(".").pop() === "bmp");
  }

  public async generateGameCard(formInfo: IFormInfo2D): Promise<GameCard> {
    return new Promise<GameCard>(() => {
      this.http.post<GameCard>(`${ClientConstants.SERVER_BASE_URL}api/game_cards/image_pair`, formInfo)
      .toPromise()
      .then(
        (gamecard) => { this.listOfGameService.addGameCard2D(gamecard); },
        (gameCard) => { alert(gameCard.error); },
      )
      .catch(
        (err) => {console.error("erreur :", err); },
      );
    });
  }

}
