import Axios, { AxiosResponse } from "axios";
import { NextFunction, Request, Response, Router } from "express";
import { inject, injectable } from "inversify";
import * as mongoose from "mongoose";
import { IBestTime } from "../../../common/communication/BestTime";
import { IBitmapImage } from "../../../common/communication/BitmapImage";
import { Constants, Dimension } from "../../../common/communication/Constants";
import { GameCard } from "../../../common/communication/game-card";
import { BmpFileGenerator } from "../services/bmp-file-generator.service";
import { DatabaseService } from "../services/database.service";
import { FormValidator2DService } from "../services/form-validator-2D.service";
import { FormValidator3DService } from "../services/form-validator-3D.service";
import { gameCard2D } from "../services/game-card-2D-schema";
import { gameCard3D } from "../services/game-card-3D-schema";
import { GameCardsService } from "../services/game-cards.service";
import { scene3D } from "../services/scene3D-schema";
import Types from "../types";

@injectable()
export class GameCardsController {

    public constructor(@inject(Types.FormValidator2DService) private formValidator2DService: FormValidator2DService,
                       @inject(Types.FormValidator3DService) private formValidator3DService: FormValidator3DService,
                       @inject(Types.GameCardsService) private gameCardsService: GameCardsService,
                       @inject(Types.BmpFileGenerator) private bmpFileGeneratorService: BmpFileGenerator,
                       @inject(Types.DatabaseService) private databaseService: DatabaseService) { }

    public get router(): Router {
        const router: Router = Router();

        router.get(Constants.CARDS_2D, (req: Request, res: Response, next: NextFunction) => {
            this.gameCardsService.getGameCards2D()
                .then((gameCardsDB: mongoose.Document[]) => {
                    res.json(this.gameCardsService.convertDBGameCards(gameCardsDB, Dimension.TWO_DIMENSION));
                })
                .catch((err: Error) => console.error(err));
        });

        router.get(Constants.CARDS_3D, (req: Request, res: Response, next: NextFunction) => {
            this.gameCardsService.getGameCards3D()
                .then((gameCardsDB: mongoose.Document[]) => {
                    res.json(this.gameCardsService.convertDBGameCards(gameCardsDB, Dimension.THREE_DIMENSION));
                })
                .catch((err: Error) => console.error(err));
        });

        router.post(Constants.IMAGE_PAIR, (req: Request, res: Response, next: NextFunction) => {
            (!this.formValidator2DService.validateForm(req.body)) ?
            res.status(Constants.ERROR).send(Constants.BAD_INFO_ERROR) :
            this.databaseService.getOne(gameCard2D, {title : req.body.gameName})
            .then((gamecard: mongoose.Document) => {
                if (gamecard) {
                    res.status(Constants.ERROR).send(Constants.BAD_NAME_ERROR);
                } else {
                    this.gameCardsService.generateDifferences(req.body.originalImage, req.body.modifiedImage)
                    .then((image: IBitmapImage) => {
                        if (this.gameCardsService.validateDifferencesImage(image)) {
                            this.bmpFileGeneratorService.generateBMPFiles(req.body, image);
                            res.json(this.gameCardsService.addGameCard2D(req.body, image));
                        } else {
                            res.status(Constants.ERROR).send(Constants.BAD_NUMBER_OF_DIFF_ERROR);
                        }
                    })
                    .catch((err: Error) => console.error(err));
                }
            })
            .catch((err: Error) => console.error(err));
        });

        router.post(Constants.INFO_3D_GAME, (req: Request, res: Response, next: NextFunction) => {
            (!this.formValidator3DService.validateForm(req.body)) ?
            res.status(Constants.ERROR).send(Constants.BAD_INFO_ERROR) :
            this.databaseService.getOne(gameCard3D, {title : req.body.gameName})
            .then((gamecard: mongoose.Document) => {
                if (gamecard) {
                    res.status(Constants.ERROR).send(Constants.BAD_NAME_ERROR);
                } else {
                    res.json(this.gameCardsService.addGameCard3D(req.body));
                }
            })
            .catch((err: Error) => console.error(err));
        });

        router.post(Constants.DELETE, (req: Request, res: Response, next: NextFunction) => {
            if (req.body.dimension === Dimension.TWO_DIMENSION) {
                this.databaseService.remove(gameCard2D, {title: req.body.title});
            } else {
                this.databaseService.remove(gameCard3D, {title: req.body.title});
                this.databaseService.remove(scene3D, {title: req.body.title});
            }
        });

        router.post(Constants.RESET, (req: Request, res: Response, next: NextFunction) => {
            const bestTimeSolo: IBestTime[] = this.gameCardsService.generateBestTime(Constants.MINIMAL_TIME_SOLO,
                                                                                     Constants.MAXIMAL_TIME_SOLO);
            const bestTime1v1: IBestTime[] = this.gameCardsService.generateBestTime(Constants.MINIMAL_TIME_DUO,
                                                                                    Constants.MAXIMAL_TIME_DUO);
            const newGameCard: GameCard = req.body;
            newGameCard.bestTime1v1 = bestTime1v1;
            newGameCard.bestTimeSolo = bestTimeSolo;

            if (req.body.dimension === Dimension.TWO_DIMENSION) {
                this.databaseService.updateOne(gameCard2D, {title : req.body.title},
                                               {bestScoreSolo: bestTimeSolo, bestScore1v1: bestTime1v1})
                .catch((err: Error) => console.error(err));
                res.json(newGameCard);
            } else {
                this.databaseService.updateOne(gameCard3D, {title : req.body.title},
                                               {bestScoreSolo: bestTimeSolo, bestScore1v1: bestTime1v1})
                .catch((err: Error) => console.error(err));
                res.json(newGameCard);
            }
        });

        router.post(Constants.NEW_SCORE, (req: Request, res: Response, next: NextFunction) => {
            Axios.post<GameCard>( Constants.SERVER_BASE_URL + Constants.API + Constants.HIGH_SCORE_CONTROLLER, req.body)
            .then((gameCard: AxiosResponse<GameCard>) => {
                if (gameCard.data.dimension === Dimension.TWO_DIMENSION) {
                    this.databaseService.updateOne(gameCard2D, {title : gameCard.data.title}, gameCard.data)
                    .catch((err: Error) => console.error(err));
                    res.json(gameCard);
                } else {
                    this.databaseService.updateOne(gameCard3D, {title : gameCard.data.title}, gameCard.data)
                    .catch((err: Error) => console.error(err));
                    res.json(gameCard);
                }
            })
            .catch((err: Error) => console.log(err));
        });

        return router;
    }
}
