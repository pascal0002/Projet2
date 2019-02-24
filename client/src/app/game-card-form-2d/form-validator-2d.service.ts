import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Constants } from "../../../../common/communication/Constants";
import { IFormInfo2D } from "../../../../common/communication/FormInfo2D";
import { GameCard } from "../../../../common/communication/game-card";

@Injectable({
  providedIn: "root",
})

export class FormValidator2dService {

  public constructor(private http: HttpClient) { }

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

  public async generateGameCard(formInfo: IFormInfo2D): Promise<GameCard> {
    return this.http.post<GameCard>(Constants.SERVER_BASE_URL + Constants.API + Constants.IMAGE_PAIR_URL, formInfo).toPromise();
  }
}
