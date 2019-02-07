import { GameCard } from "../../../common/communication/game-card";

const serverAccessPath: string = "http://localhost:3000/";

export const THREE_DIMENSION_GAME_CARD_LIST: GameCard[] = [
    {
        title: "La forêt",
        originalImagePath: serverAccessPath + "originalImages/scene1.jpg",
        modifiedImagePath: serverAccessPath + "modifiedImages/scene1Modified.bmp",
        bestTimeSolo: ["5:27 loler", "6:31 kid", "6:49 noob"],
        bestTime1v1: ["4:21 Ko", "4:33 ferfw", "5:25 frew"],
    },

    {
        title: "Bois",
        originalImagePath: serverAccessPath + "originalImages/scene2.jpg",
        modifiedImagePath: serverAccessPath + "modifedImages/scene2Modified.bmp",
        bestTimeSolo: ["1:21 noob lord", "1:34 sick", "1:45 knee"],
        bestTime1v1: ["1:21 tcho", "1:33 eda", "1:45 hipi"],
    },

    {
        title: "La Ville",
        originalImagePath: serverAccessPath + "originalImages/scene3.jpg",
        modifiedImagePath: serverAccessPath + "modifiedImages/scene3Modified.bmp",
        bestTimeSolo: ["9:01 blarg", "9:37 Yoink123", "10:45 minecrafter"],
        bestTime1v1: ["6:14 ew", "6:23 quatre", "7:05 trois"],
    },
];
