import { NextFunction, Request, Response, Router } from "express";
import { inject, injectable } from "inversify";
import { ServerConstants } from "../../../common/communication/Constants";
import { BitmapDecoder } from "../services/bitmap-decoder.service";
import { BmpFileGenerator } from "../services/bmp-file-generator.service";
import { DifferenceIdentificator2DService } from "../services/difference-identificator-2d.service";
import { DifferencesGeneratorService } from "../services/differences-generator.service";
import Types from "../types";

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
            const imgOfDifferencePixels: number[] = this.bitmapDecoder.getPixels("/public/modifiedImages/MY_TEST_BMP_MODIF.bmp");
            console.log("color at 0 before erase : " + imgOfDifferencePixels[0]);
            if (this.differenceIdentificator2DService.confirmDifference(req.body, imgOfDifferencePixels)) {
                if (!this.bitmapGenerator.fileExists("/public/tempDifferenceImage/MY_TEST_BMP_MODIF.bmp")) {
                    this.bitmapGenerator.createTemporaryFile(imgOfDifferencePixels,
                                                             "/public/tempDifferenceImage/MY_TEST_BMP_MODIF.bmp",
                                                             "MY_TEST_BMP_MODIF.bmp");
                }

                //console.log("Color at 0 : " +
                 //this.differenceIdentificator2DService.eraseDifference(req.body, imgOfDifferencePixels, ServerConstants.ACCEPTED_WIDTH)[0]);

               /* this.bitmapGenerator.createTemporaryFile(
                    ,
                    "/public/tempDifferenceImage/resultImg.bmp",
                    "resultImg.bmp");*/
            }

            this.differenceIdentificator2DService.clickPosition = req.body;
            console.log(this.differenceIdentificator2DService.getPixelAtPos(req.body, imgOfDifferencePixels));
        });

        return router;
    }
}
