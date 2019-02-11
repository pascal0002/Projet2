import { AfterViewInit, Component, ElementRef, HostListener, NgZone, ViewChild } from "@angular/core";
import {ClientConstants} from "../../../../common/communication/Constants";
import { OpenSceneConstructorService } from "./open-scene-constructor.service";

@Component({
  selector: "app-open-scene-constructor",
  templateUrl: "open-scene-constructor.component.html",
  styleUrls: ["open-scene-constructor.component.css"],
})

export class OpenSceneConstructorComponent implements AfterViewInit {

  private get canvas(): HTMLCanvasElement {
    return this.canvasRef.nativeElement;
  }

  @ViewChild("canvas") public canvasRef: ElementRef;

  public constructor(private ngZone: NgZone, private openSceneConstructorService: OpenSceneConstructorService) {/**/}

  public makeScene(): void {
    this.openSceneConstructorService.makeScene(this.canvas);
  }

  public makeObjects(): void {
    this.openSceneConstructorService.makeObjects();
  }

  public createLight(): void {
    this.openSceneConstructorService.addLighting();
  }

  public ngAfterViewInit(): void {
    this.makeScene();
    this.makeObjects();
    this.createLight();
    this.ngZone.runOutsideAngular(() => this.render());
  }

  public render(): void {
    this.openSceneConstructorService.render(this.canvas);
  }

  @HostListener("window:keydown", ["$event"])
  public KeyEvent(event: KeyboardEvent): void {
    switch (event.keyCode) {
      case ClientConstants.FORWARD_KEY:
        this.openSceneConstructorService.goForward();
        break;
      case ClientConstants.BACKWARD_KEY:
        this.openSceneConstructorService.goBackward();
        break;
      case ClientConstants.UP_KEY:
        this.openSceneConstructorService.goUp();
        break;
      case ClientConstants.DOWN_KEY:
        this.openSceneConstructorService.goDown();
        break;
      case ClientConstants.LEFT_KEY:
        this.openSceneConstructorService.goLeft();
        break;
      case ClientConstants.RIGHT_KEY:
        this.openSceneConstructorService.goRight();
        break;
      case ClientConstants.SAVE_KEY:
        this.openSceneConstructorService.saveAsImage();
        break;
      default :
        break;
    }
  }
}
