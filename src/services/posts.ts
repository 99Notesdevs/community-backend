import { PostsRepository } from "../repositories/posts";
import { PostType } from "../types/post";
import { VoteType } from "../types/vote";

export class PostsService {
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
    return PostsRepository.createPost({ communityId, title, content, type, url, imageUrl, videoUrl, userId });
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
    return PostsRepository.createPostWithPoll({
      communityId,
      title,
      content,
      type,
      url,
      imageUrl,
      videoUrl,
      userId,
      pollOptions
    });
  }

  // Get a post and its comments
  static async getPostWithComments({ userId, id, skip, take }: { userId: number; id: number; skip?: number; take?: number }) {
    return PostsRepository.getPostWithComments({ userId, id, skip, take });
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
    voteType: VoteType;
    userId: number;
  }) {
    return PostsRepository.votePost({ id, voteType, userId });
  }

  // Get posts from all communities (feed)
  static async getFeedPosts({ userId, page, limit }: { userId: number; page: number; limit: number }) {
    return PostsRepository.getFeedPosts({ userId, page, limit });
  }
}
