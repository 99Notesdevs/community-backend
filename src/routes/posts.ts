import { Router } from "express";
import { PostsController } from "../controllers/posts";
import { authenticate } from "../middlewares/authenticateMiddleware";
import { authorizeRoles } from "../middlewares/authorizeRoles";
const posts = Router();

// Create a post in a community
posts.post('/', authenticate, authorizeRoles(["Admin", "User"]), PostsController.createPost);

// Get a post and comments
posts.get('/:id', authenticate, authorizeRoles(["Admin", "User"]), PostsController.getPostWithComments);

// Delete a post
posts.delete('/:id', authenticate, authorizeRoles(["Admin", "User"]), PostsController.deletePost);

// Vote on a post
posts.post('/:id/vote', authenticate, authorizeRoles(["Admin", "User"]), PostsController.votePost);

// Get posts from all communities (feed)
posts.get('/', PostsController.getFeedPosts);

export default posts;