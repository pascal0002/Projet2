import { NextFunction, Request, Response, Router } from "express";
import { inject, injectable } from "inversify";
import { Constants } from "../../../common/communication/Constants";
import { IDiffInfoToHandle } from "../../../common/communication/DiffInfoToHandle";
import { IDifferenceErased } from "../../../common/communication/DifferenceErased";
import { IDifferenceImage } from "../../../common/communication/DifferenceImage";
import { BitmapDecoder } from "../services/bitmap-decoder.service";
import { BmpFileGenerator } from "../services/bmp-file-generator.service";
import { DifferenceIdentificator2DService } from "../services/difference-identificator-2d.service";
import { DifferencesGeneratorService } from "../services/differences-generator.service";
import Types from "../types";

@injectable()
export class DifferencesController {

    public constructor(@inject(Types.DifferencesGeneratorService) private differencesGeneratorService: DifferencesGeneratorService,
                       @inject(Types.BitmapDecoder) private bitmapDecoder: BitmapDecoder,
                       @inject(Types.BmpFileGenerator) private bitmapGenerator: BmpFileGenerator,
                       @inject(Types.DifferenceIdentificator2DService) private differenceIdentificator2DService:
            DifferenceIdentificator2DService) { }

    public get router(): Router {
        const router: Router = Router();
        router.post("/", (req: Request, res: Response, next: NextFunction) => {
            res.json(this.differencesGeneratorService.generateDifferences(req.body.originalImage, req.body.modifiedImage));
        });

        router.post("/new_game", (req: Request, res: Response, next: NextFunction) => {
            const differenceImage: IDifferenceImage = req.body;
            const imgOfDifferencePixels: number[] = this.bitmapDecoder.getPixels(Constants.PUBLIC_DIFF_FOLDER_PATH
                + differenceImage.name);
            this.bitmapGenerator.createTemporaryFile(imgOfDifferencePixels,
                                                     Constants.PUBLIC_TEMP_FOLDER_PATH + differenceImage.name,
                                                     differenceImage.name);
            res.json(imgOfDifferencePixels);
        });

        router.post("/difference_validator", (req: Request, res: Response, next: NextFunction) => {
            const diffInfoToHandle: IDiffInfoToHandle = req.body;
            const positionInPixelsArray: number = this.differenceIdentificator2DService.getPositionInArray(diffInfoToHandle.clickInfo);
            if (this.differenceIdentificator2DService.confirmDifference(diffInfoToHandle.clickInfo,
                                                                        diffInfoToHandle.differenceImage.pixels)) {
                    const updatedDiffImg: number[] = this.differenceIdentificator2DService.eraseDifference(
                                                                                                    positionInPixelsArray,
                                                                                                    diffInfoToHandle.differenceImage.pixels,
                                                                                                    Constants.VALID_BMP_WIDTH);

                    const differenceErased: IDifferenceErased = {
                        posOfPixelsToErase: this.differenceIdentificator2DService.posOfDifferencePixels,
                        updatedDifferenceImage: updatedDiffImg,
                    };
                    // Send the array of the pos of diff pixels
                    // res.json(this.differenceIdentificator2DService.posOfDifferencePixels);
                    res.json(differenceErased);
                } else {
                    res.send(null);
                    // res.send([]);
                }
        });

        router.post("/image_pixels", (req: Request, res: Response, next: NextFunction) => {
            res.json(this.bitmapDecoder.flipPixelsOnYAxis(this.bitmapDecoder.getPixels(req.body.location)));
        });

        return router;
    }
}
