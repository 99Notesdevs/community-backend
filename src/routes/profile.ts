import { Router } from "express";
import { authenticate } from "../middlewares/authenticateMiddleware";
import { authorizeRoles } from "../middlewares/authorizeRoles";
import { PostsRepository } from "../repositories/posts";
import { CommentsRepository } from "../repositories/comments";

const profileRouter = Router();

// Profile posts route
profileRouter.get('/profile-posts/', authenticate, authorizeRoles(["User"]), async (req, res) => {
  try {
    const userId = parseInt(req.authUser!);
    const skip = parseInt(req.query.skip as string) || 0;
    const take = parseInt(req.query.take as string) || 10;
    
    if (isNaN(userId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID"
      });
    }

    const posts = await PostsRepository.getUserPosts(userId, skip, take);
    
    res.status(200).json({
      success: true,
      data: posts
    });
  } catch (error) {
    console.error("Error fetching user posts:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
});

// Profile comments route
profileRouter.get('/profile-comments/', authenticate, authorizeRoles(["User"]), async (req, res) => {
  try {
    const userId = parseInt(req.authUser!);
    const skip = parseInt(req.query.skip as string) || 0;
    const take = parseInt(req.query.take as string) || 10;
    
    if (isNaN(userId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID"
      });
    }

    const comments = await CommentsRepository.getUserComments(userId, skip, take);
    
    res.status(200).json({
      success: true,
      data: comments
    });
  } catch (error) {
    console.error("Error fetching user comments:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
});

export default profileRouter;