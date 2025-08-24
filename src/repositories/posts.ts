import { prisma } from "../config/prisma";

export class PostsRepository {
  // Create a post in a community
  static async createPost({
    communityId,
    title,
    content,
    type,
    url,
    imageUrl,
    videoUrl,
    userId,
  }: {
    communityId: number;
    title: string;
    content: string;
    type: string;
    url: string;
    imageUrl: string;
    videoUrl: string;
    userId: number;
  }) {
    return prisma.post.create({
      data: {
        communityId,
        title,
        content,
        type,
        url,
        imageUrl,
        videoUrl,
        userId,
      },
    });
  }

  // Get a post and its comments
  static async getPostWithComments({ id, skip, take }: { id: number ; skip?: number; take?: number }) {
    return prisma.post.findUnique({
      where: { id },
      include: {
        comments: {
          orderBy: { createdAt: "desc" },
          skip,
          take,
        },
      },
    });
  }

  // Delete a post
  static async deletePost({ id, userId }: { id: number; userId: number }) {
    const post = await prisma.post.findUnique({ where: { id } });
    if (!post || post.authorId !== userId) throw new Error("Unauthorized to delete this post");
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
