import * as mongoose from "mongoose";

const scoreSchema: mongoose.Schema = new mongoose.Schema({ user: String, time: Number }, {_id: false});

const gamecard2DSchema: mongoose.Schema = new mongoose.Schema({
    title: String,
    originalImagePath: String,
    modifiedImagePath: String,
    differenceImagePath: String,
    bestScoreSolo: [scoreSchema],
    bestScore1v1: [scoreSchema],
});

export const gameCard2D: mongoose.Model<mongoose.Document> = mongoose.model("gamecard2D", gamecard2DSchema, "gamecards2D");
