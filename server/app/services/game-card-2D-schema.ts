import * as mongoose from "mongoose";

const gamecard2DSchema: mongoose.Schema = new mongoose.Schema({
    title: String,

    originalImagePath: String,
    modifiedImagePath: String,
    differenceImagePath: String,

    bestScoreSolo: [[String, Number]],
    bestScore1v1: [[String, Number]],
});

export const gameCard2D: mongoose.Model<mongoose.Document> = mongoose.model("gamecard2D", gamecard2DSchema, "gamecards2D");
