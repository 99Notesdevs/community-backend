import { Router } from "express";
import community from "./community";
import comments from "./comments";
import posts from "./posts";
import bookmarkRouter from "./bookmark";
import profileRouter from "./profile";
const router = Router();

router.get("/healthCheck", (req, res) => {
  res.status(200).json({
    message: "Working fine!",
  });
});

router.use('/communities', community);
router.use('/comments', comments);
router.use('/posts', posts);
router.use('/bookmark', bookmarkRouter);
router.use('/profile', profileRouter);

export default router;