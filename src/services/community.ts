import { CommunityRepository } from "../repositories/community";

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
    description,
    userId,
  }: {
    name: string;
    description?: string;
    userId: number;
  }) {
    return CommunityRepository.createCommunity({ name, description, userId });
  }

  // Get a community
  static async getCommunity({ id }: { id: number }) {
    return CommunityRepository.getCommunity({ id });
  }

  // Get posts for a community
  static async getCommunityPosts({ id }: { id: number }) {
    return CommunityRepository.getCommunityPosts({ id });
  }

  // Join a community
  static async joinCommunity({ id, userId }: { id: number; userId: number }) {
    return CommunityRepository.joinCommunity({ id, userId });
  }

  // Leave a community
  static async leaveCommunity({ id, userId }: { id: number; userId: number }) {
    return CommunityRepository.leaveCommunity({ id, userId });
  }

  // Active/Inactive community
  static async setCommunityActivity({
    id,
    active,
  }: {
    id: number;
    active: boolean;
  }) {
    return CommunityRepository.setCommunityActivity({ id, active });
  }

  // Get all members of a community
  static async getCommunityMembers({ id }: { id: number }) {
    return CommunityRepository.getCommunityMembers({ id });
  }

  // Get personal communities
  static async getPersonalCommunities({ userId }: { userId: number }) {
    return CommunityRepository.getPersonalCommunities({ userId });
  }
}
