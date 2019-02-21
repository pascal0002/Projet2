import { Injectable } from "@angular/core";
// import { Constants } from "../../../../common/communication/Constants";

@Injectable({
  providedIn: "root",
})
export class Game3dGeneratorService {

  public constructor() {/**/ }

  public generateObjectsLeft(): void {
    console.log("scene gauche");
  }

  public generateObjectsRight(): void {
    console.log("scene droite");
  }
}
