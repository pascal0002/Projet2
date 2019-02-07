import {GameCard} from "../../../common/communication/game-card";

const serverAccessPath: string = "http://localhost:3000/";

export const TWO_DIMENSION_GAME_CARD_LIST: GameCard[] = [
    {   title: "Chat",
        originalImagePath: serverAccessPath + "originalImages/cat.bmp",
        modifiedImagePath: serverAccessPath + "modifiedImages/catModified.bmp",
        bestTimeSolo: ["1:21 Paul", "1:34 AAA", "1:45 OOO"],
        bestTime1v1: ["0:58 Ko", "1:13 frew1", "1:21 frew2"],
    },

    {   title: "Nissan",
        originalImagePath: serverAccessPath + "originalImages/nissan_patrol.jpg",
        modifiedImagePath: serverAccessPath + "modifiedImages/nissan_patrolModified.bmp",
        bestTimeSolo: ["1:21 Paul", "1:34 AAA", "1:45 OOO"],
        bestTime1v1: ["0:58 Ko", "1:13 frew1", "1:21 frew2"],
    },

    {   title: "test",
        originalImagePath: serverAccessPath + "originalImages/TEST.jpg",
        modifiedImagePath: serverAccessPath + "modifiedImages/TESTModified.bmp",
        bestTimeSolo: ["3:30 blabla", "4:31 user", "4:55 name"],
        bestTime1v1: ["2:08 nick", "2:33 te", "2:48 nice"],
    },

];
