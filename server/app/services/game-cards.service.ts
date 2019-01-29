import Axios, { AxiosResponse } from "axios";
import { injectable } from "inversify";
import {BitmapImage} from "../../../common/communication/BitmapImage";

@injectable()
export class GameCardsService {

  public constructor() {/**/}

  public generateDifferences(originalImg: BitmapImage, modifiedImg: BitmapImage): Promise<BitmapImage> {
    const images: Object = {"originalImage": originalImg,
                            "modifiedImage": modifiedImg};

    return Axios.post<BitmapImage>("http://localhost:3000/api/differences", images)
    .then((image: AxiosResponse<BitmapImage>) => {
        return image.data;
    });
  }

  public validateDifferencesImage(differencesImage: BitmapImage): boolean {
    return true;
  }
}
