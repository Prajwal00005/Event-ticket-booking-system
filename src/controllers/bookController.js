import bookingService from "../services/bookServices.js";

const createBooking = async (req, res) => {
  try {
    const { eventId, quantity } = req.body;
    const userId = req.user.id;

    // Create a booking
    const result = await bookingService.createBooking({
      eventId,
      quantity,
      userId,
    });

    // Proceed with payment
    const paymentResult = await bookingService.createPayment(result, userId);

    if (!paymentResult) {
      return res.status(400).json({ message: "Payment failed" }); // 🛠 Fixed .message -> .json
    }

    return res.status(201).json({
      message: `${quantity} ticket(s) booked successfully`,
      data: result,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getUserBookings = async (req, res) => {
  try {
    const userId = req.user.id;

    const result = await bookingService.getUserBookings(userId);

    return res.status(200).json({
      message: "User bookings fetched successfully",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getBookingById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await bookingService.getBookingById(id);

    if (!result) return res.status(404).json({ message: "Booking not found" });

    return res.status(200).json({
      message: "Booking fetched successfully",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const cancelBooking = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await bookingService.cancelBooking(id);

    if (!result) return res.status(404).json({ message: "Booking not found" });

    return res.status(200).json({
      message: "Booking canceled successfully",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getOrganizerBookings = async (req, res) => {
  try {
    const organizerId = req.user.id;
    const bookings = await bookingService.getOrganizerBookings(organizerId);

    return res.status(200).json({
      message: "Bookings fetched successfully",
      data: bookings,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export default {
  createBooking,
  getUserBookings,
  getBookingById,
  cancelBooking,
  getOrganizerBookings,
};
