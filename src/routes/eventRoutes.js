import express from "express";
import multer, { memoryStorage } from "multer";
import eventController from "../controllers/eventController.js";
import auth from "../middleware/auth.js";
import { MERCHANT } from "../constants/role.js";
import roleBasedAuth from "../middleware/roleBasedAuth.js";

const router = express.Router();

const upload = multer({ multer: memoryStorage() });

router.post(
  "/",
  auth,
  roleBasedAuth(MERCHANT),
  upload.array("images", 5),
  eventController.createEvent
);
router.get("/", eventController.getEvents);
router.get("/:id", eventController.getEvent);
router.put(
  "/:id",
  auth,
  roleBasedAuth(MERCHANT),
  upload.array("images", 5),
  eventController.updateEvent
);
router.delete(
  "/:id",
  auth,
  roleBasedAuth(MERCHANT),
  eventController.deleteEvent
);
router.get("/organizers/all", auth, eventController.getOrganizers);
router.get(
  "/own",
  auth,
  roleBasedAuth(MERCHANT),
  eventController.getSelfEvents
);

export default router;
