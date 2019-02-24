import * as mongoose from "mongoose";

const testSchema: mongoose.Schema = new mongoose.Schema({
    test: String,
});

export const test: mongoose.Model<mongoose.Document> = mongoose.model("test", testSchema, "tests");
