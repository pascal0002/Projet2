import { NextFunction, Request, Response, Router } from "express";
import { inject, injectable } from "inversify";
import { ServerConstants } from "../../../common/communication/Constants";
import { BitmapDecoder } from "../services/bitmap-decoder.service";
import { BmpFileGenerator } from "../services/bmp-file-generator.service";
import { DifferenceIdentificator2DService } from "../services/difference-identificator-2d.service";
import { DifferencesGeneratorService } from "../services/differences-generator.service";
import Types from "../types";
import { IClickCoordinates } from "../../../common/communication/ClickCoordinates";

@injectable()
export class DifferencesController {

    public constructor(@inject(Types.DifferencesGeneratorService) private differencesGeneratorService: DifferencesGeneratorService,
                       @inject(Types.DifferenceIdentificator2DService) private differenceIdentificator2DService:
                                                                                DifferenceIdentificator2DService,
                       @inject(Types.BitmapDecoder) private bitmapDecoder: BitmapDecoder,
                       @inject(Types.BmpFileGenerator) private bitmapGenerator: BmpFileGenerator) { }

    public get router(): Router {
        const router: Router = Router();
        router.post("/", (req: Request, res: Response, next: NextFunction) => {
            res.json(this.differencesGeneratorService.generateDifferences(req.body.originalImage, req.body.modifiedImage));
        });
        router.post("/difference_validator", (req: Request, res: Response, next: NextFunction) => {
            const clickPosition: IClickCoordinates = req.body;
            const positionInPixelsArray: number = this.differenceIdentificator2DService.getPositionInArray(clickPosition);
            let imgOfDifferencePixels: number[];

            if (!this.bitmapGenerator.fileExists("/public/tempDifferenceImage/MY_TEST_BMP_MODIF.bmp")) {
                imgOfDifferencePixels = this.bitmapDecoder.getPixels("/public/modifiedImages/MY_TEST_BMP_MODIF.bmp");
                this.bitmapGenerator.createTemporaryFile(imgOfDifferencePixels,
                                                         "/public/tempDifferenceImage/MY_TEST_BMP_MODIF.bmp",
                                                         "MY_TEST_BMP_MODIF.bmp");
            } else {
                imgOfDifferencePixels = this.bitmapDecoder.getPixels("/public/tempDifferenceImage/MY_TEST_BMP_MODIF.bmp");
            }

            if (this.differenceIdentificator2DService.confirmDifference(clickPosition, imgOfDifferencePixels)) {
                // Overwrite the temp image
                this.bitmapGenerator.createTemporaryFile(
                    this.differenceIdentificator2DService.eraseDifference(positionInPixelsArray,
                                                                          imgOfDifferencePixels,
                                                                          ServerConstants.ACCEPTED_WIDTH),
                    "/public/tempDifferenceImage/MY_TEST_BMP_MODIF.bmp",
                    "MY_TEST_BMP_MODIF.bmp");
            }
        });

        return router;
    }
}
