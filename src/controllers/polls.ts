import { Request, Response } from "express";
import { PollService } from "../services/polls";

export class PollController {
  static async addOption(req: Request, res: Response) {
    try {
      const { postId, text } = req.body;
      const option = await PollService.addOption({
        postId: Number(postId),
        text,
      });
      res.status(201).json({ success: true, data: option });
    } catch (error) {
      res
        .status(400)
        .json({
          success: false,
          message: error instanceof Error ? error.message : "Unknown error",
        });
    }
  }

  static async getOptions(req: Request, res: Response) {
    try {
      const postId = Number(req.params.postId);
      const options = await PollService.getOptions({ postId });
      res.status(200).json({ success: true, data: options });
    } catch (error) {
      res
        .status(400)
        .json({
          success: false,
          message: error instanceof Error ? error.message : "Unknown error",
        });
    }
  }

  static async voteOption(req: Request, res: Response) {
    try {
      const { pollOptionId } = req.body;
      const vote = await PollService.voteOption({
        pollOptionId: Number(pollOptionId),
        userId: Number(req.authUser!),
      });
      res.status(201).json({ success: true, data: vote });
    } catch (error) {
      res
        .status(400)
        .json({
          success: false,
          message: error instanceof Error ? error.message : "Unknown error",
        });
    }
  }

  static async getResults(req: Request, res: Response) {
    try {
      const postId = Number(req.params.postId);
      const results = await PollService.getResults({ postId });
      res.status(200).json({ success: true, data: results });
    } catch (error) {
      res
        .status(400)
        .json({
          success: false,
          message: error instanceof Error ? error.message : "Unknown error",
        });
    }
  }
}
