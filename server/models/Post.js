import mongoose from "mongoose";

const postSchema=mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        picturePath: {
            type: String,
            required: true
        },
    },
    { timestamps: true }
);

const Post=mongoose.model("Post", postSchema);

export default Post;