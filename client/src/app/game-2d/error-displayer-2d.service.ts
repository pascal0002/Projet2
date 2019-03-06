import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { IClickInfo } from "../../../../common/communication/ClickInfo";
import { Constants } from "../../../../common/communication/Constants";

@Injectable({
  providedIn: "root",
})
export class ErrorDisplayer2dService {

  public clickingPermission: Subject<boolean>;

  public constructor() {
    this.clickingPermission = new Subject<boolean>();
  }

  public drawError(xPos: number, yPos: number, textCtx: CanvasRenderingContext2D): void {
    const adjustedPosition: IClickInfo = this.getAdjustedErrorPosition(xPos, yPos);
    this.setStyle(textCtx);
    this.drawText(Constants.ERROR_MESSAGE_IDENTIFICATION, adjustedPosition.xPos, adjustedPosition.yPos, textCtx);
    this.drawTextOutline(Constants.ERROR_MESSAGE_IDENTIFICATION, adjustedPosition.xPos, adjustedPosition.yPos, textCtx);
    this.clearCanvasAfterASecond(textCtx);
  }

  private drawText(text: string, xPos: number, yPos: number, textCtx: CanvasRenderingContext2D): void {
    textCtx.fillText(text, xPos, yPos);
  }

  private drawTextOutline(text: string, xPos: number, yPos: number, textCtx: CanvasRenderingContext2D): void {
    textCtx.strokeText(text, xPos, yPos);
  }

  private getAdjustedErrorPosition(xPosition: number, yPosition: number): IClickInfo {
    return {xPos: xPosition - Constants.X_POS_CORRECTION, yPos: yPosition - Constants.Y_POS_CORRECTION};
  }

  private setStyle(textCtx: CanvasRenderingContext2D): void {
    textCtx.font = Constants.ERROR_FONT;
    textCtx.fillStyle = Constants.ERROR_FILL_STYLE;
  }

  private clearCanvasAfterASecond(ctx: CanvasRenderingContext2D): void {
    this.changeClickingPermission(false);
    setTimeout(() => {
      ctx.clearRect(0, 0, Constants.VALID_BMP_WIDTH, Constants.VALID_BMP_HEIGHT);
      this.changeClickingPermission(true);
    },         Constants.ONE_SECOND);
  }

  private changeClickingPermission(permission: boolean): void {
    this.clickingPermission.next(permission);
  }
}
