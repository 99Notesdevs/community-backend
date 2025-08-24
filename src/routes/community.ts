import { Router } from "express";
const community = Router();

// Get all communities (skip and take)
community.get('/');

// Create a new community
community.post('/')

// Get a community
community.get('/:id')

// Get posts for a community
community.get('/:id/posts');

// Join a community
community.post('/:id/join');

// Leave a community
community.post('/:id/leave');

// Active/Inactive community
community.put('/:id/activity');

// Get all members of a community
community.get('/:id/members');


// Get personal communities
community.get('/users/me');

export default community;