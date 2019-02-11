import { AfterViewInit, Component, ElementRef, HostListener, NgZone, ViewChild } from "@angular/core";
import {ClientConstants} from "../../../../common/communication/Constants";
import { OriginalSceneConstructorService } from "./original-scene-constructor.service";

@Component({
  selector: "app-scene",
  templateUrl: "scene.component.html",
  styleUrls: ["scene.component.css"],
})

export class SceneComponent implements AfterViewInit {

  private get canvas(): HTMLCanvasElement {
    return this.canvasRef.nativeElement;
  }

  @ViewChild("canvas") public canvasRef: ElementRef;

  public constructor(private ngZone: NgZone, private originalSceneConstructorService: OriginalSceneConstructorService) {/**/}

  public ngAfterViewInit(): void {
    this.originalSceneConstructorService.createOriginalCanvas(this.canvas);
    this.ngZone.runOutsideAngular(() => this.render());
  }

  public render(): void {
    this.originalSceneConstructorService.render(this.canvas);
  }

  @HostListener("window:keydown", ["$event"])
  public KeyEvent(event: KeyboardEvent): void {
    switch (event.keyCode) {
      case ClientConstants.FORWARD_KEY:
        this.originalSceneConstructorService.goForward();
        break;
      case ClientConstants.BACKWARD_KEY:
        this.originalSceneConstructorService.goBackward();
        break;
      case ClientConstants.UP_KEY:
        this.originalSceneConstructorService.goUp();
        break;
      case ClientConstants.DOWN_KEY:
        this.originalSceneConstructorService.goDown();
        break;
      case ClientConstants.LEFT_KEY:
        this.originalSceneConstructorService.goLeft();
        break;
      case ClientConstants.RIGHT_KEY:
        this.originalSceneConstructorService.goRight();
        break;
      case ClientConstants.SAVE_KEY:
        this.originalSceneConstructorService.saveAsImage();
        break;
      default :
        break;
    }
  }
}
