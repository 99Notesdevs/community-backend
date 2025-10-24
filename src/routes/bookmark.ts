import { Router } from "express";
import { authenticate } from "../middlewares/authenticateMiddleware";
import { authorizeRoles } from "../middlewares/authorizeRoles";
import { BookmarksController } from "../controllers/bookmark";

const bookmarkRouter = Router();

bookmarkRouter.post(
  "/:postId/bookmark",
  authenticate,
  authorizeRoles(["User"]),
  BookmarksController.toggleBookmark
);

bookmarkRouter.get(
  "/profile/bookmarks",
  authenticate,
  authorizeRoles(["User"]),
  BookmarksController.getUserBookmarks
);

bookmarkRouter.get(
  "/:postId/bookmark/status",
  authenticate,
  authorizeRoles(["User"]),
  BookmarksController.isBookmarked
);

export default bookmarkRouter;
