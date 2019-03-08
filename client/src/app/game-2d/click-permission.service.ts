import { Injectable, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { Constants } from "../../../../common/communication/Constants";
import { ErrorDisplayer2dService } from "./error-displayer-2d.service";

@Injectable({
  providedIn: "root",
})
export class ClickPermissionService implements OnDestroy {
  public clickPermission: Subscription;
  public clickIsEnabled: boolean;
  public canSendInfoToServer: boolean;

  public constructor(private errorDisplayerService: ErrorDisplayer2dService) {
    this.clickIsEnabled = true;
    this.canSendInfoToServer = false;
    this.clickPermission = this.errorDisplayerService.clickingPermission.subscribe((permission) => this.clickIsEnabled = permission);
   }

  public ngOnDestroy(): void {
     this.clickPermission.unsubscribe();
  }

  public canClickAgain(): boolean {
    return (this.clickIsEnabled && this.canSendInfoToServer);
  }

  public hasClickedAnError(): boolean {
    return !this.clickIsEnabled;
  }

  public blockClicksToServer(): void {
    this.canSendInfoToServer = false;
  }

  public unblockClicksToServerAfterDelay(): void {
    setTimeout(() => {
      this.canSendInfoToServer = true;
    },         (Constants.QUARTER_A_SECOND));
  }
}
