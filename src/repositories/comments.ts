import { prisma } from "../config/prisma";

export class CommentsRepository {
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
    return prisma.comment.create({
      data: {
        postId,
        content,
        userId,
      },
    });
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
    const skip = (page - 1) * limit;
    return prisma.comment.findMany({
      where: { postId },
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
    });
  }

  // Delete a comment
  static async deleteComment({ id }: { id: number }) {
    return prisma.comment.delete({
      where: { id },
    });
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
    return prisma.commentVote.upsert({
      where: {
        commentId_userId: { commentId: id, userId },
      },
      update: {
        voteType,
      },
      create: {
        commentId: id,
        userId,
        voteType,
      },
    });
  }
}
