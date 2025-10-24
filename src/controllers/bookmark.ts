import { Request, Response } from "express";
import { BookmarkService } from "../services/bookmark";

type AuthRequest = Request & { user?: { id: number; role?: string } };

export class BookmarksController {
  static async toggleBookmark(req: AuthRequest, res: Response) {
    try {
      const postId = parseInt(req.params.postId);
      const userId = parseInt(req.authUser!);

      if (isNaN(postId) || isNaN(userId)) {
        return res
          .status(400)
          .json({ success: false, message: "Invalid postId or userId" });
      }

      const result = await BookmarkService.toogleBookmark(userId, postId);
      return res.status(200).json({
        success: true,
        data: { postId, userId, ...result },
      });
    } catch (err: any) {
      const status = err?.status || 500;
      return res
        .status(status)
        .json({
          success: false,
          message: err?.message || "Internal server error",
        });
    }
  }

  static async getUserBookmarks(req: AuthRequest, res: Response) {
    try {
      const userId = parseInt(req.authUser! || "");
      const skip = parseInt((req.query.skip as string) || "0");
      const take = parseInt((req.query.take as string) || "10");

      if (isNaN(userId)) {
        return res
          .status(400)
          .json({ success: false, message: "Invalid userId" });
      }

      const result = await BookmarkService.getUserBookmarks(userId, skip, take);
      return res
        .status(200)
        .json({
          success: true,
          data: result,
        });
    } catch (err: any) {
      const status = err?.status || 500;
      return res
        .status(status)
        .json({
          success: false,
          message: err?.message || "Internal server error",
        });
    }
  }

  static async isBookmarked(req: AuthRequest, res: Response) {
    try {
      const postId = parseInt(req.params.postId || "");
      const userId = parseInt(req.authUser!);

      if (isNaN(postId) || isNaN(userId)) {
        return res
          .status(400)
          .json({ success: false, message: "Invalid postId or userId" });
      }

      const result = await BookmarkService.isPostBookmarked(userId, postId);
      return res
        .status(200)
        .json({
          success: true,
          data: { postId, userId, result },
        });
    } catch (err: any) {
      const status = err?.status || 500;
      return res
        .status(status)
        .json({
          success: false,
          message: err?.message || "Internal server error",
        });
    }
  }
}
