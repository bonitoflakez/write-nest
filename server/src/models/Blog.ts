import { mongoose } from "../config/db";
import { v4 as uuidv4 } from "uuid"

/**
 * user_id -> uuid -> unique
 * blog_id -> uuid -> unique
 * blog_title -> string
 * blog_description -> string
 * blog_content -> string
 */

const BlogSchema = new mongoose.Schema({
  user: {
    type: String, // user_id
    required: true,
  },
  blog_id: {
    type: String,
    default: uuidv4(),
    unique: true,
    required: true,
  },
  blog_title: String,
  blog_description: String,
  blog_content: String,
});

const Blog = mongoose.model('Blog', BlogSchema)

export default Blog;