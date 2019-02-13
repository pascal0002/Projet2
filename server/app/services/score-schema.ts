import * as mongoose from "mongoose";

export const scoreSchema: mongoose.Schema = new mongoose.Schema({ user: String, time: Number }, {_id: false});
