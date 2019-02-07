import * as mongoose from "mongoose";

const gamecard2DSchema: mongoose.Schema = new mongoose.Schema({
    title: String,
    originalImagePath: String,
    modifiedImagePath: String,
    differenceImagePath: String,
    bestTimeSolo: [String],
    bestTime1v1: [String],
});

export const gameCardDB: mongoose.Model<mongoose.Document> = mongoose.model("gamecard2D", gamecard2DSchema, "gamecards2D");
