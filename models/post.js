const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const postSchema = new Schema({
    title: {
        type: String,
        required: [true, "Title is required"]
    },
    description: {
        type: String,
        required: [true, "Description is required"]
    },
    image : {
        type : String,
        required : true
    }
}, { timestamps: true });

const PostModel = model("InstaPost", postSchema);

module.exports = PostModel;
