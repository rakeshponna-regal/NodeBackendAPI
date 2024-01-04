import mongoose from "mongoose";
import Blogs from "../model/Blogs.js";
import User from "../model/User.js";


/**
 * @swagger
 * /getAllblogs:
 *   get:
 *     summary: Get all blogs
 *     responses:
 *       200:
 *         description: Returns all blogs
 */
export const getAllblogs = async (req, res, next) => {
    let blogs;
    try {
        blogs = await Blogs.find()
    } catch (error) {
        console.log(error)
    }
    if (!blogs) {
        return res.status(400).json({
            message: "No Blogs found"
        })
    }
    return res.status(200).json({
        blogs
    })
}

export const addBlog = async (req, res, next) => {
    const { title, description, image, user } = req.body;
    let existingUser;
    try {
        existingUser = await  User.findById(user)
    } catch (error) {
        console.log(error)
    }
    if(!existingUser){
        return res.status(401).json({
            message:"Invalid User ID"
            })
    }
    const blog = new Blogs({
        title,
        description,
        image,
        user
    })
    try {
        const session = await mongoose.startSession()
        session.startTransaction();
        await blog.save({session})
        existingUser.blogs.push(blog)
        await existingUser.save({session})
        await session.commitTransaction();
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            message: error
        })
    }

    return res.status(200).json({
        blog
    })
}

export const updateBlog = async (req, res, next) => {
    const { title, description } = req.body;
    const blogId = req.params.id
    let blog
    try {
        blog = await Blogs.findByIdAndUpdate(blogId, {
            title,
            description
        })
    } catch (error) {
        console.log(error)
    }
    if (!blog) {
        return res.status(404).json({
            message: "Blog not found"
        })
    }
    return res.status(200).json({
        blog
    })

}
export const deleteBlog = async (req, res, next) => {
     const blogId = req.params.id
    let blog
    try {
        // blog = await Blogs.findByIdAndDelete(blogId)
        blog = await Blogs.findByIdAndDelete(blogId).populate('user')
        await blog.user.blogs.pull(blog)
        await blog.user.save()
    } catch (error) {
        console.log(error)
    }
    if (!blog) {
        return res.status(500).json({
            message: "Blog not found"
        })
    }
    return res.status(200).json({
        message: "Blog Deleted succesfully"
    })

}

export const getById = async (req, res) => {
    const id = req.params.id
    let blogs
    try {
        blogs = await Blogs.findById(id);
    } catch (err) {
        console.log("Error in getting the data", err);
    }
    if (!blogs) {
        return res.status(404).send({
            error: "No such user exists!"
        });
    }
    return res.status(200).send(blogs);
}

export const getUserblogs = async (req, res, next) => {
    const userId =  req.params.id
    let userBlogs;
    try {
        userBlogs = await User.findById(userId).populate('blogs')
    } catch (error) {
        console.log(error)
    }
    if (!userBlogs) {
        return res.status(400).json({
            message: "No Blogs found"
        })
    }
    return res.status(200).json({
        userBlogs
    })
}
