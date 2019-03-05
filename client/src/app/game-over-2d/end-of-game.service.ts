import { Injectable } from "@angular/core";
import {Constants} from "../../../../common/communication/Constants";
@Injectable({
  providedIn: "root",
})
export class EndOfGameService {
  public nbDiffFound: number;
  public constructor() {
    this.nbDiffFound = 0;
  }

  public gameIsOver(): boolean {
    return this.nbDiffFound === Constants.VALID_NUMBER_OF_DIFFERENCES;
  }

}
