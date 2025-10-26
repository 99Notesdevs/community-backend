import { Request, Response } from "express";
import logger from "../utils/logger";
import { PostsService } from "../services/posts";

export class PostsController {
  // Create a post in a community
  static async createPost(req: Request, res: Response) {
    try {
      logger.info("Creating post in community");
      const { communityId, title, content, type, url, imageUrl, videoUrl, pollOptions } = req.body;
      if (!communityId || !title || !content)
        throw new Error("Missing required fields");
      let post;
      // If post type is POLL and pollOptions are provided, create post and poll options atomically
      if (
        type === "POLL" &&
        Array.isArray(pollOptions) &&
        pollOptions.length > 0
      ) {
        post = await PostsService.createPostWithPoll({
          communityId: Number(communityId),
          title,
          content,
          type,
          url,
          imageUrl,
          videoUrl,
          userId: Number(req.authUser),
          pollOptions,
        });
      } else {
        post = await PostsService.createPost({
          communityId: Number(communityId),
          title,
          content,
          type,
          url,
          imageUrl,
          videoUrl,
          userId: Number(req.authUser),
        });
      }
      logger.info("Post created successfully");
      res.status(201).json({ success: true, data: post });
    } catch (error: unknown) {
      logger.error("Error in createPost method");
      res
        .status(400)
        .json({
          success: false,
          message: error instanceof Error ? error.message : "Unknown error",
        });
    }
  }

  // Get a post and its comments
  static async getPostWithComments(req: Request, res: Response) {
    try {
      logger.info("Fetching post and comments");
      const { id } = req.params;
      const userId = parseInt(req.authUser!);
      const skip = parseInt(req.query.skip as string) || 0;
      const take = parseInt(req.query.take as string) || 10;
      const post = await PostsService.getPostWithComments({ userId, id: Number(id), skip, take });
      logger.info("Post and comments fetched successfully");
      res.status(200).json({ success: true, data: post });
    } catch (error: unknown) {
      logger.error("Error in getPostWithComments method");
      res
        .status(400)
        .json({
          success: false,
          message: error instanceof Error ? error.message : "Unknown error",
        });
    }
  }

  // Delete a post
  static async deletePost(req: Request, res: Response) {
    try {
      logger.info("Deleting post");
      const { id } = req.params;
      const deleted = await PostsService.deletePost({
        id: Number(id),
        userId: Number(req.authUser),
      });
      logger.info("Post deleted successfully");
      res.status(200).json({ success: true, data: deleted });
    } catch (error: unknown) {
      logger.error("Error in deletePost method");
      res
        .status(400)
        .json({
          success: false,
          message: error instanceof Error ? error.message : "Unknown error",
        });
    }
  }

  // Vote on a post
  static async votePost(req: Request, res: Response) {
    try {
      logger.info("Voting on post");
      const { id } = req.params;
      const { voteType } = req.body;
      if (!voteType) throw new Error("Missing voteType");
      const result = await PostsService.votePost({
        id: Number(id),
        voteType,
        userId: Number(req.authUser),
      });
      logger.info("Voted on post successfully");
      res.status(200).json({ success: true, data: result });
    } catch (error: unknown) {
      logger.error("Error in votePost method");
      res
        .status(400)
        .json({
          success: false,
          message: error instanceof Error ? error.message : "Unknown error",
        });
    }
  }

  // Get posts from all communities (feed)
  static async getFeedPosts(req: Request, res: Response) {
    try {
      logger.info("Fetching feed posts");
      const userId = parseInt(req.authUser!);
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const posts = await PostsService.getFeedPosts({ userId, page, limit });
      logger.info("Feed posts fetched successfully");
      res.status(200).json({ success: true, data: posts });
    } catch (error: unknown) {
      logger.error("Error in getFeedPosts method");
      res
        .status(400)
        .json({
          success: false,
          message: error instanceof Error ? error.message : "Unknown error",
        });
    }
  }
}
