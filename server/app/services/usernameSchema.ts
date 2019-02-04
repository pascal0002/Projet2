import * as mongoose from "mongoose";

const usernameSchema: mongoose.Schema = new mongoose.Schema({
    username: String,
});

export const username: mongoose.Model<mongoose.Document, {}> = mongoose.model("username", usernameSchema);
