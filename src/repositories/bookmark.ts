import { prisma } from "../config/prisma";

export class BookmarksRepository {
  // Toggle bookmark (bookmark if not bookmarked, remove if bookmarked)
  static async toggleBookmark({
    userId,
    postId,
  }: {
    userId: number;
    postId: number;
  }) {
    const existingBookmark = await prisma.bookmark.findUnique({
      where: {
        userId_postId: { userId, postId },
      },
    });

    if (existingBookmark) {
      await prisma.bookmark.delete({
        where: {
          userId_postId: { userId, postId },
        },
      });
      return { action: "removed" };
    } else {
      await prisma.bookmark.create({
        data: {
          userId,
          postId,
        },
      });
      return { action: "added" };
    }
  }

  // Get user's bookmarked posts
  static async getUserBookmarks({
    userId,
    skip = 0,
    take = 10,
  }: {
    userId: number;
    skip?: number;
    take?: number;
  }) {
    return prisma.bookmark.findMany({
      where: { userId },
      include: {
        post: {
          include: {
            community: true,
            _count: {
              select: {
                comments: true,
                votes: true,
              },
            },
          },
        },
      },
      orderBy: { createdAt: "desc" },
      skip,
      take,
    });
  }

  // Check if post is bookmarked by user
  static async isPostBookmarked({
    userId,
    postId,
  }: {
    userId: number;
    postId: number;
  }) {
    const bookmark = await prisma.bookmark.findUnique({
      where: {
        userId_postId: { userId, postId },
      },
    });
    return !!bookmark;
  }
}
