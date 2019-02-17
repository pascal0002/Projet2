import { NextFunction, Request, Response, Router } from "express";
import { inject, injectable } from "inversify";
import { IClickInfo } from "../../../common/communication/ClickInfo";
import { ServerConstants } from "../../../common/communication/Constants";
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
            const imgOfDifferencePixels: number[] = this.bitmapDecoder.getPixels(ServerConstants.PUBLIC_DIFF_FOLDER_PATH
                                                                               + differenceImage.name);
            this.bitmapGenerator.createTemporaryFile(imgOfDifferencePixels,
                                                     ServerConstants.PUBLIC_TEMP_FOLDER_PATH + differenceImage.name,
                                                     differenceImage.name);
        });

        router.post("/difference_validator", (req: Request, res: Response, next: NextFunction) => {
            const clickInfo: IClickInfo = req.body;
            const positionInPixelsArray: number = this.differenceIdentificator2DService.getPositionInArray(clickInfo);
            let imgOfDifferencePixels: number[];

            imgOfDifferencePixels = this.bitmapDecoder.getPixels(ServerConstants.PUBLIC_TEMP_FOLDER_PATH
                                                                 + clickInfo.differenceImageName);
            if (this.differenceIdentificator2DService.confirmDifference(clickInfo, imgOfDifferencePixels)) {
                // Overwrite the temp image
                this.bitmapGenerator.createTemporaryFile(
                    this.differenceIdentificator2DService.eraseDifference(positionInPixelsArray,
                                                                          imgOfDifferencePixels,
                                                                          ServerConstants.ACCEPTED_WIDTH),
                    ServerConstants.PUBLIC_TEMP_FOLDER_PATH + clickInfo.differenceImageName,
                    clickInfo.differenceImageName);

                // Send the array of the pos of diff pixels
                res.json(this.differenceIdentificator2DService.posOfDifferencePixels);
            }
        });

        router.post("/bitmap_encoder", (req: Request, res: Response, next: NextFunction) => {
            console.log(req.body.location);
            res.json(this.bitmapDecoder.flipPixelsOnYAxis(this.bitmapDecoder.getPixels(req.body.location)));
        });

        return router;
    }
}
