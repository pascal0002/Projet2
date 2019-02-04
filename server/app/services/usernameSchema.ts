import * as mongoose from "mongoose";

const userSchema: mongoose.Schema = new mongoose.Schema({
    name: String,
});

export const user: mongoose.Model<mongoose.Document> = mongoose.model("user", userSchema, "usernames");
