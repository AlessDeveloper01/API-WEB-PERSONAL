import mongoose, { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const postSchema = new Schema({
    title: String,
    miniature: String,
    content: String,
    path: {
        type: String,
        unique: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

postSchema.plugin(mongoosePaginate);

export const PostModel = model("Post", postSchema);