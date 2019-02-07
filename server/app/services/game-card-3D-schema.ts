import * as mongoose from "mongoose";

const gamecard3DSchema: mongoose.Schema = new mongoose.Schema({
    title: String,
    originalImagePath: String,
    bestTimeSolo: [String],
    bestTime1v1: [String],
});

export const gameCard3D: mongoose.Model<mongoose.Document> = mongoose.model("gamecard3D", gamecard3DSchema, "gamecards3D");
