import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Constants } from "../../../../common/communication/Constants";
import { IFormInfo2D } from "../../../../common/communication/FormInfo2D";
import { GameCard } from "../../../../common/communication/game-card";
import { ListOfGamesService } from "../list-of-games-view/list-of-games.service";

@Injectable({
  providedIn: "root",
})

export class FormValidator2dService {

  public constructor(private http: HttpClient, private listOfGameService: ListOfGamesService) { }

  public validTitle(title: string): boolean {
    return (title.length >= Constants.MIN_TITLE_LENGTH && title.length <= Constants.MAX_TITLE_LENGTH);
  }

  public validImageDimensions(height: number, width: number): boolean {
    return (height === Constants.VALID_BMP_HEIGHT && width === Constants.VALID_BMP_WIDTH);
  }

  public validBitDepth(bitDepth: number): boolean {
    return (bitDepth === Constants.VALID_BITS_PER_PIXEL);
  }

  public validBMPExtension(extension: string): boolean {
    return ((extension.toLowerCase()).split(".").pop() === Constants.VALID_FILE_EXTENSION);
  }

  public generateGameCard(formInfo: IFormInfo2D): void {
    this.http.post<GameCard>(`${Constants.SERVER_BASE_URL}api/game_cards/image_pair`, formInfo)
      .toPromise()
      .then(
        (gamecard) => { this.listOfGameService.addGameCard2D(gamecard); },
        (gameCard) => { alert(gameCard.error); },
      )
      .catch(
        (err) => { console.error("erreur :", err); },
      );
  }
}
