import Axios, { AxiosPromise } from "axios";
import { injectable } from "inversify";
import {BitmapImage} from "../../../common/communication/BitmapImage";

@injectable()
export class GameCardsService {

  public constructor() {/**/}

  public generateDifferences(originalImg: BitmapImage, modifiedImg: BitmapImage): AxiosPromise<BitmapImage> {
    const images: Object = {"originalImage": originalImg,
                            "modifiedImage": modifiedImg};

    return Axios.post<BitmapImage>("http://localhost:3000/api/differences", images);
  }
}
