import { prisma } from "../config/prisma";

export class CommunityRepository {
  // Get all communities (skip and take)
  static async getAllCommunities({
    skip,
    take,
  }: {
    skip: number;
    take: number;
  }) {
    return prisma.community.findMany({
      skip,
      take,
      orderBy: { createdAt: "desc" },
    });
  }

  // Create a new community
  static async createCommunity({
    name,
    description,
    userId,
  }: {
    name: string;
    description?: string;
    userId: number;
  }) {
    return prisma.community.create({
      data: {
        name,
        description,
        creatorId: userId,
      },
    });
  }

  // Get a community
  static async getCommunity({ id }: { id: number }) {
    return prisma.community.findUnique({
      where: { id },
    });
  }

  // Get posts for a community
  static async getCommunityPosts({ id }: { id: number }) {
    return prisma.post.findMany({
      where: { communityId: id },
      orderBy: { createdAt: "desc" },
    });
  }

  // Join a community
  static async joinCommunity({ id, userId }: { id: number; userId: number }) {
    return prisma.communityMember.create({
      data: {
        communityId: id,
        userId,
      },
    });
  }

  // Leave a community
  static async leaveCommunity({ id, userId }: { id: number; userId: number }) {
    return prisma.communityMember.deleteMany({
      where: {
        communityId: id,
        userId,
      },
    });
  }

  // Active/Inactive community
  static async setCommunityActivity({
    id,
    active,
  }: {
    id: number;
    active: boolean;
  }) {
    return prisma.community.update({
      where: { id },
      data: { active },
    });
  }

  // Get all members of a community
  static async getCommunityMembers({ id }: { id: number }) {
    return prisma.communityMember.findMany({
      where: { communityId: id },
      include: { user: true },
    });
  }

  // Get personal communities
  static async getPersonalCommunities({ userId }: { userId: number }) {
    return prisma.communityMember.findMany({
      where: { userId },
      include: { community: true },
    });
  }
}
