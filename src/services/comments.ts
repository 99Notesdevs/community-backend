import { CommentsRepository } from "../repositories/comments";

export class CommentsService {
  // Add a comment to a post
  static async addComment({
    postId,
    content,
    userId,
    commentId
  }: {
    postId: number;
    content: string;
    userId: number;
    commentId?: number | null;
  }) {
    return CommentsRepository.addComment({ postId, content, userId, commentId });
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
    const isOwner = await CommentsRepository.isCommentOwner({ id, userId });
    if (!isOwner) {
      throw new Error("Not authorized");
    }
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
