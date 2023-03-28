import Post from "../models/Post.js";
import User from "../models/User.js";
export const createPost=async (req, res) => {
    try {
        const { name }=req.body;
        const { path }=req.file;
        // Retrieve the user ID from the JWT token
        const userId=req.user.id;
        // Create a new post object
        const newPost=new Post({
            name,
            picturePath: path,
        });
        // Save the post object to the database
        const createdPost=await newPost.save();

        const user=await User.findById(userId);
        user.posts.push(createdPost);
        await user.save();
        // Send the created post as a response
        return res.status(201).json(createdPost);
    } catch (error) {
        // Send an error message as a response
        return res.status(500).json({ message: error.message });
    }
}

export const getPosts=async (req, res) => {
    try {
        // Find the corresponding user object in the database
        const user=await User.findById(req.user.id).populate('posts');
        // Extract the posts array from the user object
        const posts=user.posts;
        // Send the posts as a response
        return res.status(200).json(posts);
    } catch (error) {
        // Handle any errors that occur
        return res.status(404).json({ message: error.message });
    }
};