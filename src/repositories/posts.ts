import { prisma } from "../config/prisma";

export class PostsRepository {
  // Create a post in a community
  static async createPost({
    communityId,
    title,
    content,
    userId,
  }: {
    communityId: number;
    title: string;
    content: string;
    userId: number;
  }) {
    return prisma.post.create({
      data: {
        communityId,
        title,
        content,
        userId,
      },
    });
  }

  // Get a post and its comments
  static async getPostWithComments({ id }: { id: number }) {
    return prisma.post.findUnique({
      where: { id },
      include: {
        comments: {
          orderBy: { createdAt: "desc" },
        },
      },
    });
  }

  // Delete a post
  static async deletePost({ id, userId }: { id: number; userId: number }) {
    // Optionally check ownership before deleting
    const post = await prisma.post.findUnique({ where: { id } });
    if (!post || post.userId !== userId) return null;
    return prisma.post.delete({ where: { id } });
  }

  // Vote on a post
  static async votePost({
    id,
    voteType,
    userId,
  }: {
    id: number;
    voteType: "up" | "down";
    userId: number;
  }) {
    return prisma.postVote.upsert({
      where: {
        postId_userId: { postId: id, userId },
      },
      update: {
        voteType,
      },
      create: {
        postId: id,
        userId,
        voteType,
      },
    });
  }

  // Get posts from all communities (feed)
  static async getFeedPosts({ page, limit }: { page: number; limit: number }) {
    const skip = (page - 1) * limit;
    return prisma.post.findMany({
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
    });
  }
}
