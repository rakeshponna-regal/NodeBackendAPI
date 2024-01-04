import express from 'express';
import { addBlog, deleteBlog, getAllblogs, getById, getUserblogs, updateBlog } from '../controllers/blog-controller.js';

const blogRouter = express.Router();

blogRouter.get("/", getAllblogs)
blogRouter.get("/:id", getById)
blogRouter.post("/add", addBlog)
blogRouter.put("/update/:id", updateBlog)
blogRouter.delete("/:id", deleteBlog)
blogRouter.get("/user/:id", getUserblogs)




export default blogRouter