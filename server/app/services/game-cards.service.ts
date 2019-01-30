import Axios, { AxiosResponse } from "axios";
import { inject, injectable } from "inversify";
import {BitmapImage} from "../../../common/communication/BitmapImage";
import Types from "../types";
import { DifferenceCounterService } from "./difference-counter-service";

const VALID_NUMBER_OF_DIFFERENCES: number = 7;
@injectable()
export class GameCardsService {

  public constructor(@inject(Types.DifferenceCounterService) private differenceCounterService: DifferenceCounterService) {/**/}

  public generateDifferences(originalImg: BitmapImage, modifiedImg: BitmapImage): Promise<BitmapImage> {
    const images: Object = {"originalImage": originalImg,
                            "modifiedImage": modifiedImg};

    return Axios.post<BitmapImage>("http://localhost:3000/api/differences", images)
    .then((image: AxiosResponse<BitmapImage>) => {

      return image.data;
    });
  }

  public validateDifferencesImage(differencesImage: BitmapImage): boolean {
    return (this.differenceCounterService.getNumberOfDifferences(differencesImage) === VALID_NUMBER_OF_DIFFERENCES);
  }
}
