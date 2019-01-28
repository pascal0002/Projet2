import { injectable } from "inversify";
import {BitmapImage} from "../../../common/communication/BitmapImage";

@injectable()
export class DifferencesGeneratorService {

  public constructor() {/**/}

  public generateDifferences(originalImg: BitmapImage, modifiedImg: BitmapImage): BitmapImage {

    return originalImg;
  }
}
