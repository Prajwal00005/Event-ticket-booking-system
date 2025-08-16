import express from "express";
import bookController from "../controllers/bookController.js";
import auth from "../middleware/auth.js";
const router = express.Router();

router.post("/", auth, bookController.createBooking);
router.get("/my-bookings", auth, bookController.getUserBookings);
router.get("/bookings", auth, bookController.getOrganizerBookings);
router.get("/:id", auth, bookController.getBookingById);
router.patch("/cancel/:id", auth, bookController.cancelBooking);

export default router;
