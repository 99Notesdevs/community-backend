import { Router } from "express";
const posts = Router();

// Create a post in a community
posts.post('/');

// Get a post and comments
posts.get('/:id');

// Delete a post
posts.delete('/:id');

// Vote on a post
posts.post('/:id/vote');

// Get posts from all communities (feed)
posts.get('/');

export default posts;