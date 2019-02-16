import * as mongoose from "mongoose";
import { scoreSchema } from "./score-schema";

const gamecard2DSchema: mongoose.Schema = new mongoose.Schema({
    title: String,
    image: String,
    modifiedImagePath: String,
    differenceImagePath: String,
    bestScoreSolo: [scoreSchema],
    bestScore1v1: [scoreSchema],
});

export const gameCard2D: mongoose.Model<mongoose.Document> = mongoose.model("gamecard2D", gamecard2DSchema, "gamecards2D");
