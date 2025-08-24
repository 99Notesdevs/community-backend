import { Router } from "express";
const comments = Router();

// Comment on a post
comments.post('/');

// Get comments for a post (with pagination)
comments.get('/post/:postId');

// Delete a comment
comments.delete('/:id');

// Vote on a comment
comments.post('/:id/vote');

export default comments;