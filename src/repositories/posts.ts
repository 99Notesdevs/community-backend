import { VoteType } from "@prisma/client";
import { prisma } from "../config/prisma";
import { PostType } from "../types/post";

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
    type: PostType;
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
        authorId: userId,
      },
    });
  }

  // Create a post with poll options atomically
  static async createPostWithPoll({
    communityId,
    title,
    content,
    type,
    url,
    imageUrl,
    videoUrl,
    userId,
    pollOptions,
  }: {
    communityId: number;
    title: string;
    content: string;
    type: PostType;
    url: string;
    imageUrl: string;
    videoUrl: string;
    userId: number;
    pollOptions: string[];
  }) {
    return prisma.$transaction(async (tx) => {
      const post = await tx.post.create({
        data: {
          communityId,
          title,
          content,
          type,
          url,
          imageUrl,
          videoUrl,
          authorId: userId,
        },
      });
      await Promise.all(
        pollOptions.map((option) =>
          tx.pollOption.create({
            data: {
              postId: post.id,
              text: option,
            },
          })
        )
      );
      return post;
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
    voteType: VoteType;
    userId: number;
  }) {
    const post = await prisma.$transaction(async (tx) => {
      const vote = await tx.vote.upsert({
        where: {
          userId_postId: { userId, postId: id },
        },
        update: {
          type: voteType,
        },
        create: {
          postId: id,
          userId,
          type: voteType,
        },
      });
      const post = await tx.post.update({
      where: { id:vote.postId },
      data: {
        votesCount: {
          increment: voteType === 'UPVOTE' ? 1 : -1,
        },
      }
    });
    return vote;
    });
    return post;
  }


  // Get posts from all communities (feed)
  static async getFeedPosts({ page, limit }: { page: number; limit: number }) {
    const skip = (page - 1) * limit;
    return prisma.post.findMany({
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
      include: {
        
      }
    });
  }
}
