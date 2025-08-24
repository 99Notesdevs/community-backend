import { CommentsRepository } from "../repositories/comments";

export class CommentsService {
  // Add a comment to a post
  static async addComment({
    postId,
    content,
    userId,
  }: {
    postId: number;
    content: string;
    userId: number;
  }) {
    return CommentsRepository.addComment({ postId, content, userId });
  }

  // Get comments for a post (with pagination)
  static async getCommentsForPost({
    postId,
    page,
    limit,
  }: {
    postId: number;
    page: number;
    limit: number;
  }) {
    return CommentsRepository.getCommentsForPost({ postId, page, limit });
  }

  // Delete a comment
  static async deleteComment({ id, userId }: { id: number; userId: number }) {
    // Optionally check ownership before deleting (not implemented here)
    return CommentsRepository.deleteComment({ id });
  }

  // Vote on a comment
  static async voteComment({
    id,
    voteType,
    userId,
  }: {
    id: number;
    voteType: "up" | "down";
    userId: number;
  }) {
    return CommentsRepository.voteComment({ id, voteType, userId });
  }
}
