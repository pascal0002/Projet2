import * as mongoose from "mongoose";
import {ServerConstants} from "../../../common/communication/Constants";

const gamecardSchema: mongoose.Schema = new mongoose.Schema({
    title: String,
    imageName: String,
    modifiedImageName: String,
    differenceImageName: String,
    bestTimeSolo: String[ServerConstants.NUMBER_HIGH_SCORE],
    bestTime1v1: String[ServerConstants.NUMBER_HIGH_SCORE],
});

export const user: mongoose.Model<mongoose.Document> = mongoose.model("gamecard", gamecardSchema, "gamecards");
