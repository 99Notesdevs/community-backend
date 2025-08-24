import { prisma } from "../config/prisma";
import community from "../routes/community";
import { CommunityType } from "../types/community";

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
    displayName,
    description,
    iconUrl,
    bannerUrl,
    type,
    userId,
  }: {
    name: string;
    displayName: string;
    description?: string;
    iconUrl?: string;
    bannerUrl?: string;
    type: CommunityType;
    userId: number;
  }) {
    // @ts-ignore
    const newCommunity = await prisma.$transaction(async (tx) => {
      const newCommunity = await tx.community.create({
        data: {
          name,
          displayName,
          description,
          iconUrl,
          bannerUrl,
          type,
          ownerId: userId
        },
      });
      await tx.communityMember.create({
        data: {
          userId,
          communityId: (await newCommunity).id,
          role: "ADMIN",
        },
      });
    });
    return newCommunity;
  }

  // Check if a user is a member of a community
  static async isUserMember({ communityId, userId }: { communityId: number; userId: number }) {
    const membership = await prisma.communityMember.findFirst({
      where: { communityId, userId },
      select: { id: true },
    });
    return !!membership;
  }

  // Check if a user is an admin of a community
  static async isUserAdmin({ communityId, userId }: { communityId: number; userId: number }) {
    const community = await prisma.community.findUnique({
      where: { id: communityId },
      select: { ownerId: true },
    });
    return community?.ownerId === userId;
  }

  // Get a community
  static async getCommunity({ id }: { id: number }) {
    return prisma.community.findUnique({
      where: { id },
    });
  }

  // Get posts for a community
  static async getCommunityPosts({ id, skip, take }: { id: number, skip: number, take: number }) {
    return prisma.post.findMany({
      where: { communityId: id },
      orderBy: { createdAt: "desc" },
      skip,
      take,
    });
  }

  // Join a community
  static async joinCommunity({ id, userId }: { id: number; userId: number }) {
    return prisma.communityMember.create({
      data: {
        communityId: id,
        userId,
        role: "MEMBER",
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
      data: { nsfw: active },
    });
  }

  // Update a community
  static async updateCommunity({
    id,
    name,
    displayName,
    description,
    iconUrl,
    bannerUrl,
    type,
  }: {
    id: number;
    name: string;
    displayName: string;
    description?: string;
    iconUrl?: string;
    bannerUrl?: string;
    type: CommunityType;
  }) {
    return prisma.community.update({
      where: { id },
      data: {
        name,
        displayName,
        description,
        iconUrl,
        bannerUrl,
        type,
      },
    });
  }

  // Get all members of a community
  static async getCommunityMembers({ id }: { id: number }) {
    return prisma.communityMember.findMany({
      where: { communityId: id },
      select: { user: true },
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
