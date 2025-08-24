import { prisma } from "../config/prisma";

export class PollRepository {
  static async addOption({ postId, text }: { postId: number; text: string }) {
    return prisma.pollOption.create({
      data: { postId, text },
    });
  }

  static async getOptions({ postId }: { postId: number }) {
    return prisma.pollOption.findMany({
      where: { postId },
      include: { voters: true },
      orderBy: { createdAt: "asc" },
    });
  }

  static async voteOption({
    pollOptionId,
    userId,
  }: {
    pollOptionId: number;
    userId: number;
  }) {
    // Upsert to respect unique constraint
    return prisma.pollVote.upsert({
      where: { userId_pollOptionId: { userId, pollOptionId } },
      update: {},
      create: { userId, pollOptionId },
    });
  }

  static async getResults({ postId }: { postId: number }) {
    // Aggregate votes for each option
    return prisma.pollOption.findMany({
      where: { postId },
      select: {
        id: true,
        text: true,
        votes: true,
        voters: { select: { id: true, userId: true } },
      },
      orderBy: { createdAt: "asc" },
    });
  }
}
