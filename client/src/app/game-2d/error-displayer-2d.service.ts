import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Constants } from "../../../../common/communication/Constants";

@Injectable({
  providedIn: "root",
})
export class ErrorDisplayer2dService {

  public clickingPermission: Subject<boolean>;

  public constructor() {
    this.clickingPermission = new Subject<boolean>();
  }

  public drawError(xPos: number, yPos: number, ctx: CanvasRenderingContext2D): void {
    ctx.font = "bold 50px Poppins";
    ctx.fillStyle = "red";
    ctx.fillText("ERROR", xPos - 75, yPos);
    ctx.font = "50px Poppins";
    ctx.strokeText("ERROR", xPos - 75, yPos);
    this.clearCanvas(ctx);
  }

  private clearCanvas(ctx: CanvasRenderingContext2D): void {
    this.clickingPermission.next(false);
    setTimeout(() => {
      ctx.clearRect(0, 0, Constants.VALID_BMP_WIDTH, Constants.VALID_BMP_HEIGHT);
      this.clickingPermission.next(true);
    },         Constants.ONE_SECOND);
  }
}
