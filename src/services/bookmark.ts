import { BookmarksRepository } from "../repositories/bookmark";
import { PostsRepository } from "../repositories/posts";

export class BookmarkService {
  static async toogleBookmark(userId: number, postId: number) {
    const post = await PostsRepository.getPost(postId);
    if (!post) {
      throw new Error("Post not found");
    }
    const result = await BookmarksRepository.toggleBookmark({ userId, postId });
    return result;
  }

  static async getUserBookmarks(
    userId: number,
    skip: number = 0,
    take: number = 10
  ) {
    const result = await BookmarksRepository.getUserBookmarks({
      userId,
      skip,
      take,
    });
    return result;
  }

  static async isPostBookmarked(userId: number, postId: number) {
    const result = await BookmarksRepository.isPostBookmarked({
      userId,
      postId,
    });
    return result;
  }
}
