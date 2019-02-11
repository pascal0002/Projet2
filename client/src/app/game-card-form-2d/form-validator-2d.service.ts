import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {ClientConstants} from "../../../../common/communication/Constants";
import { IFormInfo } from "../../../../common/communication/FormInfo";
import { GameCard } from "../../../../common/communication/game-card";
import { ListOfGamesService } from "../list-of-games-view/list-of-games.service";

@Injectable({
  providedIn: "root",
})

export class FormValidator2dService {

  public constructor(private http: HttpClient, private listOfGameService: ListOfGamesService) { }

  public openForm(): void {

    const form2D: HTMLElement | null = document.getElementById("formWindow");
    const pageMask: HTMLElement | null = document.getElementById("pageMask");

    if (form2D && pageMask) {
      form2D.style.display = "block";
      pageMask.style.display = "block";
    }
  }

  public closeForm(): void {
    const form2D: HTMLElement | null = document.getElementById("formWindow");
    const pageMask: HTMLElement | null = document.getElementById("pageMask");

    if (form2D && pageMask) {
      form2D.style.display = "none";
      pageMask.style.display = "none";
    }
  }

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

  public async generateGameCard(formInfo: IFormInfo): Promise<GameCard> {
    return new Promise<GameCard>(() => {
      this.http.post<GameCard>(`${ClientConstants.SERVER_BASE_URL}api/game_cards/image_pair`, formInfo)
      .toPromise()
      .then(
        (gamecard) => { this.listOfGameService.addGameCard2D(gamecard);
                        this.closeForm2D(); },
        (gameCard) => { alert(gameCard.error); },
      )
      .catch(
        (err) => {console.error("erreur :", err); },
      );
    });
  }

  public closeForm2D(): void {
    this.clearInputFields();
    this.closeForm();
  }

  public clearInputFields(): void {
    const modifiedImageInput: HTMLInputElement = document.getElementById("modifiedBMPInput") as HTMLInputElement;
    const orignialImageInput: HTMLInputElement = document.getElementById("originalBMPInput") as HTMLInputElement;
    const gameName: HTMLInputElement = document.getElementById("gameName") as HTMLInputElement;
    if (modifiedImageInput && orignialImageInput && gameName) {
      orignialImageInput.value = "";
      modifiedImageInput.value = "";
      gameName.value = "";
    }
  }
}
