import { Request, Response } from "express";
import logger from "../utils/logger";
import { CommunityService } from "../services/community";

export class CommunityController {
  // Get all communities (skip and take)
  static async getAllCommunities(req: Request, res: Response) {
    try {
      logger.info("Fetching all communities");
      const skip = parseInt(req.query.skip as string) || 0;
      const take = parseInt(req.query.take as string) || 20;
      const communities = await CommunityService.getAllCommunities({
        skip,
        take,
      });
      logger.info("Communities fetched successfully");
      res.status(200).json({ success: true, data: communities });
    } catch (error: unknown) {
      logger.error("Error in getAllCommunities method");
      res
        .status(400)
        .json({
          success: false,
          message: error instanceof Error ? error.message : "Unknown error",
        });
    }
  }

  // Create a new community
  static async createCommunity(req: Request, res: Response) {
    try {
      logger.info("Creating new community");
      const { name, displayName, description, iconUrl, bannerUrl, type } = req.body;
      if (!name) throw new Error("Community name is required");
      const community = await CommunityService.createCommunity({
        name,
        displayName,
        description,
        iconUrl,
        bannerUrl,
        type,
        userId: parseInt(req.authUser!),
      });
      logger.info("Community created successfully");
      res.status(201).json({ success: true, data: community });
    } catch (error: unknown) {
      logger.error("Error in createCommunity method");
      res
        .status(400)
        .json({
          success: false,
          message: error instanceof Error ? error.message : "Unknown error",
        });
    }
  }

  // Get a community
  static async getCommunity(req: Request, res: Response) {
    try {
      logger.info("Fetching community by ID");
      const { id } = req.params;
      const community = await CommunityService.getCommunity({ id: parseInt(id) });
      logger.info("Community fetched successfully");
      res.status(200).json({ success: true, data: community });
    } catch (error: unknown) {
      logger.error("Error in getCommunity method");
      res
        .status(400)
        .json({
          success: false,
          message: error instanceof Error ? error.message : "Unknown error",
        });
    }
  }

  // Get posts for a community
  static async getCommunityPosts(req: Request, res: Response) {
    try {
      logger.info("Fetching posts for community");
      const { id } = req.params;
      const skip = parseInt(req.query.skip as string) || 0;
      const take = parseInt(req.query.take as string) || 20;
      const posts = await CommunityService.getCommunityPosts({ id: parseInt(id), skip, take });
      logger.info("Posts fetched successfully");
      res.status(200).json({ success: true, data: posts });
    } catch (error: unknown) {
      logger.error("Error in getCommunityPosts method");
      res
        .status(400)
        .json({
          success: false,
          message: error instanceof Error ? error.message : "Unknown error",
        });
    }
  }

  // Join a community
  static async joinCommunity(req: Request, res: Response) {
    try {
      logger.info("Joining community");
      const { id } = req.params;
      const result = await CommunityService.joinCommunity({
        id: parseInt(id),
        userId: parseInt(req.authUser!),
      });
      logger.info("Joined community successfully");
      res.status(200).json({ success: true, data: result });
    } catch (error: unknown) {
      logger.error("Error in joinCommunity method");
      res
        .status(400)
        .json({
          success: false,
          message: error instanceof Error ? error.message : "Unknown error",
        });
    }
  }

  // Leave a community
  static async leaveCommunity(req: Request, res: Response) {
    try {
      logger.info("Leaving community");
      const { id } = req.params;
      const result = await CommunityService.leaveCommunity({
        id: parseInt(id),
        userId: parseInt(req.authUser!),
      });
      logger.info("Left community successfully");
      res.status(200).json({ success: true, data: result });
    } catch (error: unknown) {
      logger.error("Error in leaveCommunity method");
      res
        .status(400)
        .json({
          success: false,
          message: error instanceof Error ? error.message : "Unknown error",
        });
    }
  }

  // Active/Inactive community
  static async setCommunityActivity(req: Request, res: Response) {
    try {
      logger.info("Setting community activity");
      const { id } = req.params;
      const { active } = req.body;
      const result = await CommunityService.setCommunityActivity({
        id: parseInt(id),
        active,
        userId: parseInt(req.authUser!),
      });
      logger.info("Community activity updated successfully");
      res.status(200).json({ success: true, data: result });
    } catch (error: unknown) {
      logger.error("Error in setCommunityActivity method");
      res
        .status(400)
        .json({
          success: false,
          message: error instanceof Error ? error.message : "Unknown error",
        });
    }
  }

  // Update a community
  static async updateCommunity(req: Request, res: Response) {
    try {
      logger.info("Updating community");
      const { id } = req.params;
      const userId = parseInt(req.authUser!);
      const { name, displayName, description, iconUrl, bannerUrl, type } = req.body;
      const updatedCommunity = await CommunityService.updateCommunity({
        id: parseInt(id),
        name,
        displayName,
        description,
        iconUrl,
        bannerUrl,
        type,
        userId
      });
      logger.info("Community updated successfully");
      res.status(200).json({ success: true, data: updatedCommunity });
    } catch (error: unknown) {
      logger.error("Error in updateCommunity method");
      res
        .status(400)
        .json({
          success: false,
          message: error instanceof Error ? error.message : "Unknown error",
        });
    }
  }

  // Get all members of a community
  static async getCommunityMembers(req: Request, res: Response) {
    try {
      logger.info("Fetching community members");
      const { id } = req.params;
      const members = await CommunityService.getCommunityMembers({ id: parseInt(id), userId: parseInt(req.authUser!) });
      logger.info("Community members fetched successfully");
      res.status(200).json({ success: true, data: members });
    } catch (error: unknown) {
      logger.error("Error in getCommunityMembers method");
      res
        .status(400)
        .json({
          success: false,
          message: error instanceof Error ? error.message : "Unknown error",
        });
    }
  }

  // Get personal communities
  static async getPersonalCommunities(req: Request, res: Response) {
    try {
      logger.info("Fetching personal communities");
      const userId = parseInt(req.authUser!);
      console.log("userId",userId);
      const communities = await CommunityService.getPersonalCommunities({
        userId,
      });
      logger.info("Personal communities fetched successfully");
      res.status(200).json({ success: true, data: communities });
    } catch (error: unknown) {
      logger.error("Error in getPersonalCommunities method");
      res
        .status(400)
        .json({
          success: false,
          message: error instanceof Error ? error.message : "Unknown error",
        });
    }
  }
}
