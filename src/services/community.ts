import { CommunityRepository } from "../repositories/community";
import type { CommunityType } from "../types/community";

export class CommunityService {
  // Get all communities (skip and take)
  static async getAllCommunities({
    skip,
    take,
  }: {
    skip: number;
    take: number;
  }) {
    return CommunityRepository.getAllCommunities({ skip, take });
  }

  // Create a new community
  static async createCommunity({
    name,
    displayName,
    description,
    iconUrl,
    bannerUrl,
    type,
    userId
  }: {
    name: string;
    displayName: string;
    description?: string;
    iconUrl?: string;
    bannerUrl?: string;
    type: CommunityType;
    userId: number;
  }) {
    return CommunityRepository.createCommunity({ name, displayName, description, iconUrl, bannerUrl, type, userId });
  }

  // Get a community
  static async getCommunity({ id }: { id: number }) {
    const isMember = await CommunityRepository.isUserMember({ communityId: id, userId: id });
    const isAdmin = await CommunityRepository.isUserAdmin({ communityId: id, userId: id });
    if (!(isMember || isAdmin)) throw new Error("Unauthorized: Only members can view community details");
    return CommunityRepository.getCommunity({ id });
  }

  // Get posts for a community
  static async getCommunityPosts({ id, skip, take }: { id: number, skip: number, take: number }) {
    const isMember = await CommunityRepository.isUserMember({ communityId: id, userId: id });
    const isAdmin = await CommunityRepository.isUserAdmin({ communityId: id, userId: id });
    if (!(isMember || isAdmin)) throw new Error("Unauthorized: Only members can view community posts");
    return CommunityRepository.getCommunityPosts({ id, skip, take });
  }

  // Join a community
  static async joinCommunity({ id, userId }: { id: number; userId: number }) {
    return CommunityRepository.joinCommunity({ id, userId });
  }

  // Leave a community
  static async leaveCommunity({ id, userId }: { id: number; userId: number }) {
    const isMember = await CommunityRepository.isUserMember({ communityId: id, userId });
    if (!isMember) throw new Error("Unauthorized: Only members can leave the community");
    return CommunityRepository.leaveCommunity({ id, userId });
  }

  // Active/Inactive community
  static async setCommunityActivity({
    id,
    active,
    userId
  }: {
    id: number;
    active: boolean;
    userId: number;
  }) {
    const isAdmin = await CommunityRepository.isUserAdmin({ communityId: id, userId });
    if (!isAdmin) throw new Error("Unauthorized: Only admins can change community activity status");
    return CommunityRepository.setCommunityActivity({ id, active });
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
    userId
  }: {
    id: number;
    name: string;
    displayName: string;
    description?: string;
    iconUrl?: string;
    bannerUrl?: string;
    type: CommunityType;
    userId: number;
  }) {
    const isAdmin = await CommunityRepository.isUserAdmin({ communityId: id, userId });
    if (!isAdmin) throw new Error("Unauthorized: Only admins can update the community");
    return CommunityRepository.updateCommunity({
      id,
      name,
      displayName,
      description,
      iconUrl,
      bannerUrl,
      type
    });
  }

  // Get all members of a community
  static async getCommunityMembers({ id, userId }: { id: number; userId: number }) {
    const isMember = await CommunityRepository.isUserMember({ communityId: id, userId });
    if (!isMember) throw new Error("Unauthorized: Only members can view community members");
    return CommunityRepository.getCommunityMembers({ id });
  }

  // Get personal communities
  static async getPersonalCommunities({ userId }: { userId: number }) {
    return CommunityRepository.getPersonalCommunities({ userId });
  }
}
