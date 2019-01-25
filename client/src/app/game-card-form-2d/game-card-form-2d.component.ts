import { Component, OnInit } from "@angular/core";
import {DifferencesGeneratorService} from "../differences-generator.service";
import {FormHandler2dService} from "./form-handler-2d.service";

@Component({
  selector: "app-game-card-form-2d",
  templateUrl: "./game-card-form-2d.component.html",
  styleUrls: ["./game-card-form-2d.component.css"],
})
export class GameCardFormComponent implements OnInit {
  public isFk: boolean = true;
  public title: string;

  public constructor(private formHandlerService: FormHandler2dService, private differencesGenerator: DifferencesGeneratorService) { }

  public closeForm2D(): void {
    this.formHandlerService.closeForm();
  }
  public generateDifferences(): void {
    this.differencesGenerator.generateDifferences();
  }
  public ngOnInit(): void {
    /**/
  }

}
