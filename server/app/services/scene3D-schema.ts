// Ryan approuve ce disable
// tslint:disable:align
import * as mongoose from "mongoose";

const threeObjectSchema: mongoose.Schema = new mongoose.Schema({
    color: String,
    diameter: Number,
    height: Number,
    position: [Number],
    orientation: [Number],
    type: Number,
}, {_id: false});

const scenes3DSchema: mongoose.Schema = new mongoose.Schema({
    title: String,
    originalScene: [threeObjectSchema],
    modifiedScene: [threeObjectSchema],
});

export const scene3D: mongoose.Model<mongoose.Document> = mongoose.model("scene3D", scenes3DSchema, "scenes3D");
