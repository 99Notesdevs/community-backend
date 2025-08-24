import { PostsRepository } from "../repositories/posts";

export class PostsService {
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
    return PostsRepository.createPost({ communityId, title, content, userId });
  }

  // Get a post and its comments
  static async getPostWithComments({ id }: { id: number }) {
    return PostsRepository.getPostWithComments({ id });
  }

  // Delete a post
  static async deletePost({ id, userId }: { id: number; userId: number }) {
    return PostsRepository.deletePost({ id, userId });
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
    return PostsRepository.votePost({ id, voteType, userId });
  }

  // Get posts from all communities (feed)
  static async getFeedPosts({ page, limit }: { page: number; limit: number }) {
    return PostsRepository.getFeedPosts({ page, limit });
  }
}
