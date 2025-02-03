const instaPost = require('../models/post')


const getPosts = async (req, res) => {
    try{
        
       const posts = await instaPost.find();

       res.status(200).json(posts);

    }catch(error){
        res.status(500).json({msg : "Server Error" , error : error.mesage})
    }
}


const createPosts = async (req, res) => {
    try {
        console.log("Request Body:", req.body);
        console.log("Uploaded File:", req.file);

        const { title, description } = req.body;

        // Check if an image file was uploaded
        if (!req.file) {
            return res.status(400).json({ msg: "Image is required" });
        }

        // Create a new post with image path
        await instaPost.create({ 
            title, 
            description, 
            image: `/uploads/${req.file.filename}`  // Save image path in DB
        });

        res.status(201).json({ msg: "Post Created Successfully" });

    } catch (error) {
        console.error("Error creating post:", error);
        res.status(500).json({ msg: error.message });
    }
};

const updatePosts = async (req, res) => {
    try {
            const { title, description } = req.body;
            const { id } = req.params;

            if (!id) {
                return res.status(401).json({ msg: "Post id is missing" });
            }

            if (!title || !description) {
                return res.status(401).json({ msg: "Title and description are required" });
            }

            // Prepare data for updating
            const updatedData = {
                title,
                description
            };

            // If a new image is uploaded, update the image field
            if (req.file) {
                updatedData.image = `/uploads/${req.file.filename}`; // Use the relative path to the uploaded image
            }

            // Update the post
            const updatedPost = await instaPost.findByIdAndUpdate(id, updatedData, { new: true });

            if (!updatedPost) {
                return res.status(401).json({ msg: "Error while updating post" });
            }

            res.status(200).json({ msg: "Post updated successfully", updatedPost });
    } catch (error) {
        res.status(404).json({ msg: error.message });
    }
};





const deletePosts = async ( req, res ) => {
    try{
        const { id } = req.params;

        if(!id){
            return res.status(401).json({msg: "Post id is missing"})
        }

        const deletePost = await instaPost.findByIdAndDelete(id)

        if(!deletePost){
            return res.status(401).json({msg: "Post not found"})
        }

        res.status(200).json({ msg: "Post deleted successfully" });

    }catch(error){
        res.status(404).json({msg : error.message})
    }
}


module.exports = {
    getPosts,
    createPosts,
    updatePosts,
    deletePosts
}