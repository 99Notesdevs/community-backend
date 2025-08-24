import { Router } from "express";
import { PollController } from "../controllers/polls";

const poll = Router();

// Add a poll option to a post
poll.post("/option", PollController.addOption);

// Get all poll options for a post
poll.get("/options/:postId", PollController.getOptions);

// Vote on a poll option
poll.post("/vote", PollController.voteOption);

// Get poll results for a post
poll.get("/results/:postId", PollController.getResults);

export default poll;
