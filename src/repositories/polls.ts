import { prisma } from "../config/prisma";

export class PollRepository {
  static async addOption({ postId, text }: { postId: number; text: string }) {
    return await prisma.pollOption.create({
      data: { postId, text },
    });
  }

  static async getOptions({ postId }: { postId: number }) {
    return await prisma.pollOption.findMany({
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
    await prisma.pollOption.update({
      where: { id: pollOptionId },
      data: { votes: { increment: 1 } },
    });
    // Upsert to respect unique constraint
    return await prisma.pollVote.upsert({
      where: { userId_pollOptionId: { userId, pollOptionId } },
      update: {},
      create: { userId, pollOptionId },
    });
  }

  static async getResults({ postId }: { postId: number }) {
    // Aggregate votes for each option
    return await prisma.pollOption.findMany({
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
