import { Component, OnInit } from "@angular/core";
import{FormHandler2dService} from "./form-handler-2d.service";

@Component({
  selector: "app-game-card-form-2d",
  templateUrl: "./game-card-form-2d.component.html",
  styleUrls: ["./game-card-form-2d.component.css"],
})
export class GameCardFormComponent implements OnInit {
  public isFk:boolean = true;
  title:String;
  public constructor(private formHandlerService: FormHandler2dService) { }

  public closeForm2D(){
    this.formHandlerService.closeForm();
  }
  public ngOnInit() {
  }

}
