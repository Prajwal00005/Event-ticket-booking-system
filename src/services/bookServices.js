import { db } from "../database/db.js";
import { v4 as uuidv4 } from "uuid";
import payViaKhalti from "../utils/khalti.js";

const createBooking = async ({ eventId, quantity, userId }) => {
  if (!eventId) throw new Error("Event ID is required");
  if (!quantity || quantity < 1) throw new Error("Quantity must be at least 1");

  const event = await db.Event.findByPk(eventId);
  if (!event) throw new Error("Event not found");

  const bookings = [];

  for (let i = 0; i < quantity; i++) {
    const ticketId = `TICKET-${eventId}-${uuidv4().slice(0, 8).toUpperCase()}`;

    const booking = await db.Booking.create({
      ticketId,
      status: "pending",
      userId,
      eventId,
    });

    bookings.push(booking);
  }

  return bookings;
};

const getUserBookings = async (userId) => {
  const bookings = await db.Booking.findAll({
    where: { userId },
    include: [
      {
        model: db.Event,
        as: "event",
        attributes: ["title", "date", "time", "location"],
      },
    ],
  });

  return bookings;
};

const getBookingById = async (id) => {
  const booking = await db.Booking.findOne({
    where: { id },
    include: [
      { model: db.User, as: "user", attributes: ["fullName", "email"] },
      {
        model: db.Event,
        as: "event",
        attributes: ["title", "date", "time", "location"],
      },
    ],
  });

  return booking;
};

const cancelBooking = async (id) => {
  const booking = await db.Booking.findByPk(id);
  if (!booking) return null;

  booking.status = "canceled";
  await booking.save();

  return booking;
};

const getOrganizerBookings = async (organizerId) => {
  const events = await db.Event.findAll({
    where: { createdBy: organizerId },
    attributes: ["id"],
  });
  const eventIds = events.map((event) => event.id);

  const bookings = await db.Booking.findAll({
    where: { eventId: eventIds },
    include: [
      { model: db.User, as: "user", attributes: ["id", "fullName", "email"] },
      {
        model: db.Event,
        as: "event",
        attributes: ["id", "title", "date", "time"],
      },
    ],
  });

  return bookings;
};

const createPayment = async ({ result, userId }) => {
  try {
    if (!Array.isArray(result) || result.length === 0) {
      throw new Error("No bookings to create payment for.");
    }

    const eventId = result[0].eventId;

    const event = await db.Event.findByPk(eventId);
    if (!event) throw new Error("Event not found");

    const ticketCount = result.length;
    const totalPrice = ticketCount * event.price;

    // Create a Payment in DB
    const payment = await db.Payment.create({
      userId,
      totalPrice,
    });

    // Update all bookings to link this payment
    const bookingIds = result.map((b) => b.id);
    await db.Booking.update(
      { paymentId: payment.id },
      { where: { id: bookingIds } }
    );

    // Send payment request to Khalti
    const khaltiResponse = await payViaKhalti({
      amount: totalPrice,
      orderId: payment.id,
      orderName: `Ticket Booking for ${event.title || "Event"}`,
    });

    if (!khaltiResponse) {
      console.warn("Khalti initiation failed, consider rolling back payment.");
      return null;
    }

    // Optional: store Khalti-specific fields (like pidx, payment_url) if needed
    return {
      payment,
      khalti: khaltiResponse,
    };
  } catch (e) {
    console.error("createPayment error:", e.message);
    return null;
  }
};

export default {
  createBooking,
  createPayment,
  getUserBookings,
  getBookingById,
  cancelBooking,
  getOrganizerBookings,
};
