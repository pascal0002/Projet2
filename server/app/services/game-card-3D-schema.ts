import * as mongoose from "mongoose";

const gamecard3DSchema: mongoose.Schema = new mongoose.Schema({
    title: String,
    originalImagePath: String,
    bestScoreSolo: [{ user: String, time: Number }],
    bestScore1v1: [{ user: String, time: Number }],
});

export const gameCard3D: mongoose.Model<mongoose.Document> = mongoose.model("gamecard3D", gamecard3DSchema, "gamecards3D");
