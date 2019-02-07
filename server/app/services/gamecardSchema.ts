import * as mongoose from "mongoose";
import {ServerConstants} from "../../../common/communication/Constants";

const gamecardSchema: mongoose.Schema = new mongoose.Schema({
    title: String,
    originalImagePath: String,
    modifiedImagePath: String,
    differenceImagePath: String,
    bestTimeSolo: String[ServerConstants.NUMBER_HIGH_SCORE],
    bestTime1v1: String[ServerConstants.NUMBER_HIGH_SCORE],
});

export const user: mongoose.Model<mongoose.Document> = mongoose.model("gamecard", gamecardSchema, "gamecards");
