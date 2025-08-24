import { Router } from "express";
import { CommentsController } from "../controllers/comments";
import { authenticate } from "../middlewares/authenticateMiddleware";
import { authorizeRoles } from "../middlewares/authorizeRoles";
const comments = Router();

// Comment on a post
comments.post('/', authenticate, authorizeRoles(["Admin", "User"]), CommentsController.addComment);

// Get comments for a post (with pagination)
comments.get('/post/:postId', authenticate, authorizeRoles(["Admin", "User"]), CommentsController.getCommentsForPost);

// Delete a comment
comments.delete('/:id', authenticate, authorizeRoles(["Admin", "User"]), CommentsController.deleteComment);

// Vote on a comment
comments.post('/:id/vote', authenticate, authorizeRoles(["Admin", "User"]), CommentsController.voteComment);

export default comments;