import * as mongoose from "mongoose";

const userSchema: mongoose.Schema = new mongoose.Schema({
    username: String,
});

export const user: mongoose.Model<mongoose.Document> = mongoose.model("username", userSchema, "usernames");
