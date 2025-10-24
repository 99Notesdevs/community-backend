import { prisma } from "../config/prisma";
import { VoteType } from "../types/vote";

export class CommentsRepository {
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
    return prisma.comment.create({
      data: {
        postId,
        content,
        authorId: userId,
        parentId: commentId || null
      },
    });
  }

  // Comment Ownership Check
  static async isCommentOwner({ id, userId }: { id: number; userId: number }) {
    const comment = await prisma.comment.findUnique({
      where: { id },
      include: { post: true },
    });
    const isUser = comment?.authorId === userId;
    const isAuthor = comment?.post?.authorId === userId;
    return isUser || isAuthor;
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
    voteType: VoteType;
    userId: number;
  }) {
    const comment = await prisma.$transaction(async (tx) => {
      const vote = await tx.vote.upsert({
        where: {
          userId_commentId: { userId, commentId: id },
        },
        update: {
          type: voteType,
        },
        create: {
          commentId: id,
          userId,
          type: voteType,
        },
      });
      await tx.comment.update({
      where: { id:vote.commentId },
      data: {
        votesCount: {
          increment: voteType === 'UPVOTE' ? 1 : -1,
        },
      }
    });
    return vote;
    });
    return comment;
  }

  // Get a user's comment
  static async getUserComments(userId: number, skip: number = 0, take: number = 10) {
    const comments = await prisma.comment.findMany({
      where: {
        authorId: userId
      },
      skip,
      take
    });
    return comments;
  }
}