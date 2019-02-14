import * as mongoose from "mongoose";
import { scoreSchema } from "./score-schema";

const gamecard3DSchema: mongoose.Schema = new mongoose.Schema({
    title: String,
    originalImagePath: String,
    bestScoreSolo: [scoreSchema],
    bestScore1v1: [scoreSchema],
});

export const gameCard3D: mongoose.Model<mongoose.Document> = mongoose.model("gamecard3D", gamecard3DSchema, "gamecards3D");
