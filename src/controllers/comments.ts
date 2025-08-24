import { Request, Response } from "express";
import logger from "..//utils/logger";
import { CommentsService } from "../services/comments";
import { parse } from "dotenv";

export class CommentsController {
  // Comment on a post
  static async addComment(req: Request, res: Response) {
    try {
      logger.info("Adding comment to post");
      const { postId, content } = req.body;
      if (!postId || !content) throw new Error("Missing postId or content");
      const comment = await CommentsService.addComment({
        postId,
        content,
        userId: parseInt(req.authUser!),
      });
      if (!comment) throw new Error("Failed to add comment");
      logger.info("Comment added successfully");
      res.status(201).json({ success: true, data: comment });
    } catch (error: unknown) {
      if (error instanceof Error) {
        logger.error("Error in addComment method");
        res.status(400).json({ success: false, message: error.message });
      } else {
        logger.error("Unknown error in addComment method");
        res
          .status(500)
          .json({
            success: false,
            message: "Something went wrong in addComment",
          });
      }
    }
  }

  // Get comments for a post (with pagination)
  static async getCommentsForPost(req: Request, res: Response) {
    try {
      logger.info("Fetching comments for post");
      const { postId } = req.params;
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      if (!postId) throw new Error("Missing postId");
      const comments = await CommentsService.getCommentsForPost({
        postId: parseInt(postId),
        page,
        limit,
      });
      logger.info("Comments fetched successfully");
      res.status(200).json({ success: true, data: comments });
    } catch (error: unknown) {
      if (error instanceof Error) {
        logger.error("Error in getCommentsForPost method");
        res.status(400).json({ success: false, message: error.message });
      } else {
        logger.error("Unknown error in getCommentsForPost method");
        res
          .status(500)
          .json({
            success: false,
            message: "Something went wrong in getCommentsForPost",
          });
      }
    }
  }

  // Delete a comment
  static async deleteComment(req: Request, res: Response) {
    try {
      logger.info("Deleting comment");
      const { id } = req.params;
      if (!id) throw new Error("Missing comment id");
      const deleted = await CommentsService.deleteComment({
        id: parseInt(id),
        userId: parseInt(req.authUser!),
      });
      if (!deleted) throw new Error("Failed to delete comment");
      logger.info("Comment deleted successfully");
      res.status(200).json({ success: true });
    } catch (error: unknown) {
      if (error instanceof Error) {
        logger.error("Error in deleteComment method");
        res.status(400).json({ success: false, message: error.message });
      } else {
        logger.error("Unknown error in deleteComment method");
        res
          .status(500)
          .json({
            success: false,
            message: "Something went wrong in deleteComment",
          });
      }
    }
  }

  // Vote on a comment
  static async voteComment(req: Request, res: Response) {
    try {
      logger.info("Voting on comment");
      const { id } = req.params;
      const { voteType } = req.body; // e.g. "up" or "down"
      if (!id || !voteType) throw new Error("Missing comment id or voteType");
      const result = await CommentsService.voteComment({
        id: parseInt(id),
        voteType,
        userId: parseInt(req.authUser!),
      });
      if (!result) throw new Error("Failed to vote on comment");
      logger.info("Voted on comment successfully");
      res.status(200).json({ success: true, data: result });
    } catch (error: unknown) {
      if (error instanceof Error) {
        logger.error("Error in voteComment method");
        res.status(400).json({ success: false, message: error.message });
      } else {
        logger.error("Unknown error in voteComment method");
        res
          .status(500)
          .json({
            success: false,
            message: "Something went wrong in voteComment",
          });
      }
    }
  }
}
