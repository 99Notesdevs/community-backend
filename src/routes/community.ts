import { Router } from "express";
import { CommunityController } from "../controllers/community";
import { authenticate } from "../middlewares/authenticateMiddleware";
import { authorizeRoles } from "../middlewares/authorizeRoles";
const community = Router();

// Get all communities (skip and take)
community.get('/', CommunityController.getAllCommunities);

// Create a new community
community.post('/', authenticate, authorizeRoles(["Admin", "User"]), CommunityController.createCommunity);

// Get a community
community.get('/:id', authenticate, authorizeRoles(["Admin", "User"]), CommunityController.getCommunity);

// Get posts for a community
community.get('/:id/posts', authenticate, authorizeRoles(["User", "Admin"]), CommunityController.getCommunityPosts);

// Join a community
community.post('/:id/join', authenticate, authorizeRoles(["User", "Admin"]), CommunityController.joinCommunity);

// Leave a community
community.post('/:id/leave', authenticate, authorizeRoles(["User", "Admin"]), CommunityController.leaveCommunity);

// Active/Inactive community
community.put('/:id/activity', authenticate, authorizeRoles(["Admin", "User"]), CommunityController.setCommunityActivity);

// Update a community
community.put('/:id', authenticate, authorizeRoles(["Admin", "User"]), CommunityController.updateCommunity);

// Get all members of a community
community.get('/:id/members', authenticate, authorizeRoles(["Admin", "User"]), CommunityController.getCommunityMembers);

// Get personal communities
community.get('/me', authenticate, authorizeRoles(["Admin", "User"]), CommunityController.getPersonalCommunities);

export default community;