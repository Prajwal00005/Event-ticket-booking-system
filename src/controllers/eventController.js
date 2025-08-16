import eventService from "../services/eventServices.js";

const createEvent = async (req, res) => {
  try {
    const {
      title,
      description,
      date,
      time,
      location,
      organizer,
      capacity,
      registrationDeadline,
    } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }
    if (!date) {
      return res.status(400).json({ message: "Date is required" });
    }
    if (!time) {
      return res.status(400).json({ message: "Time is required" });
    }
    if (!location) {
      return res.status(400).json({ message: "Location is required" });
    }
    if (!organizer) {
      return res.status(400).json({ message: "Organizer is required" });
    }

    if (!capacity) {
      return res.status(400).json({ message: "Capacity is required" });
    }

    const response = await eventService.createEvent(
      {
        title,
        description,
        date,
        time,
        location,
        organizer,
        capacity,
        registrationDeadline,
      },
      req.files,
      req.user.id
    );

    return res.status(201).json({
      message: "Event created successfully",
      data: response,
    });
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
};

const getEvents = async (req, res) => {
  try {
    const response = await eventService.getEvents(req.query);

    return res.status(200).json({
      message: "Events fetched successfully",
      data: response,
    });
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
};

const getEvent = async (req, res) => {
  try {
    const { id } = req.params;

    const response = await eventService.getEvent(id);

    if (!response) {
      return res.status(404).json({ message: "Event unavailable" });
    }

    return res.status(200).json({
      message: "Event fetched successfully",
      data: response,
    });
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
};

const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;

    const response = await eventService.updateEvent(
      id,
      req.body,
      req.files,
      req.user
    );

    if (!response) {
      return res.status(400).json({ message: "Failed to update" });
    }

    return res.status(200).json({
      message: "Event updated successfully",
      data: response,
    });
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
};

const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;

    const response = await eventService.deleteEvent(id, req.user);

    if (!response) {
      return res.status(400).json({ message: "Failed to delete" });
    }

    return res.status(200).json({
      message: "Event deleted successfully",
      data: response,
    });
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
};

const getOrganizers = async (req, res) => {
  try {
    const data = await eventService.getOrganizers();

    return res.status(200).json({
      message: "Organizers fetched successfully",
      data,
    });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};

const getSelfEvents = async (req, res) => {
  try {
    const data = await eventService.getSelfEvents(req.user.id);

    return res.status(200).json({
      message: "events fetched successfully",
      data,
    });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};

export default {
  createEvent,
  getEvents,
  getEvent,
  deleteEvent,
  updateEvent,
  getOrganizers,
  getSelfEvents,
};
