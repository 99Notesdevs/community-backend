import { PollRepository } from "../repositories/polls";

export class PollService {
  static async addOption({ postId, text }: { postId: number; text: string }) {
    return PollRepository.addOption({ postId, text });
  }

  static async getOptions({ postId }: { postId: number }) {
    return PollRepository.getOptions({ postId });
  }

  static async voteOption({
    pollOptionId,
    userId,
  }: {
    pollOptionId: number;
    userId: number;
  }) {
    // Prevent double voting (unique constraint)
    return PollRepository.voteOption({ pollOptionId, userId });
  }

  static async getResults({ postId }: { postId: number }) {
    return PollRepository.getResults({ postId });
  }
}
