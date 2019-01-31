import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IBitmapImage } from "../../../../common/communication/BitmapImage";
import { GameCard } from "../../../../common/communication/game-card";

const MIN_TITLE_LENGTH: number = 3;
const MAX_TITLE_LENGTH: number = 15;
const VALID_BMP_HEIGHT: number = 480;
const VALID_BMP_WIDTH: number = 640;
const VALID_BITS_PER_PIXEL: number = 24;

@Injectable({
  providedIn: "root",
})

export class FormValidator2dService {
  private readonly BASE_URL: string = "http://localhost:3000/";

  public constructor(private http: HttpClient) { }

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
    const gameName: HTMLInputElement = document.getElementById("gameName") as HTMLInputElement;

    if (form2D && pageMask && gameName) {
      form2D.style.display = "none";
      pageMask.style.display = "none";
      gameName.value = "";
    }
  }

  public validTitle(title: string): boolean {
    return (title.length >= MIN_TITLE_LENGTH && title.length <= MAX_TITLE_LENGTH);
  }

  public validImageDimensions(height: number, width: number): boolean {
    return (height === VALID_BMP_HEIGHT && width === VALID_BMP_WIDTH);
  }

  public validBitDepth(bitDepth: number): boolean {
    return (bitDepth === VALID_BITS_PER_PIXEL);
  }

  public validBMPExtension(extension: string): boolean {
    return (extension.split(".").pop() === "bmp");
  }

  public async onSubmit(originalBitmap: IBitmapImage, modifiedBitmap: IBitmapImage): Promise<GameCard> {
    const images: Object = {"originalImage": originalBitmap,
                            "modifiedImage": modifiedBitmap};

    return new Promise<GameCard>(() => {
      this.http.post<GameCard>(`${this.BASE_URL}api/game_cards/image_pair`, images)
      .toPromise()
      .then(
        (res) => { console.log("succes :", res); },
        (res) => { console.log("erreur :", res); },
      )
      .catch(
        (err) => {console.error("erreur :", err); },
      );
    });
  }
}
