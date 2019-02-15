import { inject, injectable } from "inversify";
import { IThreeObject } from "../../../common/communication/ThreeObject";
import Types from "../types";
import { DatabaseService } from "./database.service";
import { scene3D } from "./scene3D-schema";
import { gameCard3D } from "./game-card-3D-schema";

@injectable()
export class Scene3DService {

  public constructor(@inject(Types.DatabaseService) private databaseService: DatabaseService) { }

  public addScene3D(originalScene: IThreeObject[], modifiedScene: IThreeObject[], title: string): void {
    this.databaseService.add(new scene3D({
      title: title,
      originalScene: originalScene,
      modifiedScene: modifiedScene,
    }));
  }

  public update(title: string, imageData: string): void {
    this.databaseService.updateOne(gameCard3D, {title : title}, {imageData : imageData});
  }
}
