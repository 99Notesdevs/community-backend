import { Router } from "express";
import community from "./community";
import comments from "./comments";
import posts from "./posts";
import { PostsRepository } from "../repositories/posts";
import { CommentsRepository } from "../repositories/comments";
import { authenticate } from "../middlewares/authenticateMiddleware";
import { authorizeRoles } from "../middlewares/authorizeRoles";
import bookmarkRouter from "./bookmark";
const router = Router();

router.get("/healthCheck", (req, res) => {
  res.status(200).json({
    message: "Working fine!",
  });
});

router.use('/communities', community);
router.use('/comments', comments);
router.use('/posts', posts);
router.use('/bookmark', bookmarkRouter);

// Profile posts route
router.get('/profile/profile-posts/', authenticate, authorizeRoles(["User"]), async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
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
router.get('/profile/profile-comments/', authenticate, authorizeRoles(["User"]), async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
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

export default router;