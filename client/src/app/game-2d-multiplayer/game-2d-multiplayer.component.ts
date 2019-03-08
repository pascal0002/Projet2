import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild  } from "@angular/core";
import { Subscription } from "rxjs";
import { Constants } from "../../../../common/communication/Constants";
// import { DifferenceValidatorService } from "../game-2d/difference-validator.service";
// import { ErrorDisplayer2dService } from "../game-2d/error-displayer-2d.service";
import { ImageDisplayerService } from "../game-2d/image-displayer.service";
import { GameViewService } from "../game-view/game-view.service";

@Component({
  selector: "app-game-2d-multiplayer",
  templateUrl: "./game-2d-multiplayer.component.html",
  styleUrls: ["../game-2d/game-2d.component.css", "./game-2d-multiplayer.component.css"],
})
export class Game2DMultiplayerComponent implements AfterViewInit, OnDestroy {
  // public differenceImgPixels: number[];

  public clickPermission: Subscription;
  public clickIsEnabled: boolean;
  public canSendInfoToServer: boolean;
  public isInWaitingRoom: boolean;
  public imagesHaveBeenLoeaded: boolean;

  @ViewChild(Constants.ORIGINAL_CANVAS_2D) public ogCanvas: ElementRef;
  @ViewChild(Constants.MODIFIED_CANVAS_2D) public modifCanvas: ElementRef;
  @ViewChild(Constants.MODIFIED_CANVAS_TEXT_2D) public modifTextCanvas: ElementRef;
  @ViewChild(Constants.ORIGINAL_CANVAS_TEXT_2D) public ogTextCanvas: ElementRef;

  public constructor(public gameViewService: GameViewService,
                     private imageDisplayerService: ImageDisplayerService) {
    this.isInWaitingRoom = true;
  }
                    //  private differenceValidatorService: DifferenceValidatorService,
                    //  private imageDisplayerService: ImageDisplayerService,
                    //  private errorDisplayerService: ErrorDisplayer2dService) { }

  public ngAfterViewInit(): void {
    const ogCtx: CanvasRenderingContext2D = this.ogCanvas.nativeElement.getContext(Constants.CTX_2D);
    const modifCtx: CanvasRenderingContext2D = this.modifCanvas.nativeElement.getContext(Constants.CTX_2D);

    this.drawTheTwoImages(ogCtx, modifCtx);
  }

  public ngOnDestroy(): void {

  }

  private drawTheTwoImages(ogCtx: CanvasRenderingContext2D, modifCtx: CanvasRenderingContext2D): void {
    this.drawImageInCanvas(ogCtx, this.gameViewService.model.gamecard.image, true);
    this.drawImageInCanvas(modifCtx, this.gameViewService.model.gamecard.imageModified, false)
    .then(() => {
      this.isInWaitingRoom = false;
    });
  }

  private drawImageInCanvas(ctx: CanvasRenderingContext2D, imageLocation: string, isOriginalImg: boolean): Promise<void> {
    return new Promise((resolve) => {
      resolve(
            this.imageDisplayerService.getImagePixels(this.imageDisplayerService.getFolderLocation(imageLocation, isOriginalImg))
            .then((imgPixels) => {
              (isOriginalImg) ?
                this.imageDisplayerService.originalImagePixels = imgPixels
                : this.imageDisplayerService.modifiedImagePixels = imgPixels;
              this.imageDisplayerService.drawPixelsInCanvas(ctx, imgPixels);
            })
            .catch((err: Error) => { console.error(err); }));
    });
  }

}
