import { ADMIN } from "../constants/role.js";
import { db } from "../database/db.js";
import uploadFiles from "../utils/cloudinary.js";

const createEvent = async (data, files, userId) => {
  try {
    const eventData = { ...data, createdBy: userId };

    if (files && files.length > 0) {
      const uploadedFiles = await uploadFiles(files);
      eventData.image = uploadedFiles.map((item) => item?.secure_url);
    }

    const event = await db.Event.create(eventData);
    return event;
  } catch (e) {
    throw new Error(e.message);
  }
};

const getEvents = async (query) => {
  try {
    const events = await db.Event.findAll({
      include: [
        {
          model: db.User,
          as: "creator",
          attributes: ["id", "fullName", "email"],
        },
      ],
    });
    return events;
  } catch (e) {
    throw new Error(e.message);
  }
};

const getEvent = async (id) => {
  const event = await db.Event.findByPk(id, {
    include: [
      {
        model: db.User,
        as: "creator",
        attributes: ["id", "fullName", "email"],
      },
    ],
  });
  return event;
};

const updateEvent = async (id, updateData, files, req_user) => {
  const event = await db.Event.findByPk(id);

  if (req_user.id !== event.createdBy || req_user.roles !== ADMIN) {
    throw "Access denied ";
  }

  if (!event) throw new Error("Event not found");

  if (files && files.length > 0) {
    const uploadedFiles = await uploadFiles(files);
    updateData.image = uploadedFiles.map((item) => item?.secure_url);
  }

  await event.update(updateData);
  return event;
};

const deleteEvent = async (id, req_user) => {
  const event = await db.Event.findByPk(id);

  if (req_user.id !== event.createdBy || req_user.roles !== ADMIN) {
    throw "Access denied ";
  }

  const deletedCount = await db.Event.destroy({ where: { id } });
  if (!deletedCount) throw new Error("Event not found or failed to delete");
  return true;
};

const getOrganizers = async () => {
  const organizers = await db.Event.findAll({
    attributes: [
      [db.Sequelize.fn("DISTINCT", db.Sequelize.col("organizer")), "organizer"],
    ],
  });
  return organizers.map((o) => o.organizer);
};

const getSelfEvents = async (userId) => {
  const events = await db.Event.findAll({
    where: { createdBy: userId },
    include: [
      {
        model: db.User,
        as: "creator",
        attributes: ["id", "fullName", "email"],
      },
    ],
  });
  return events;
};

export default {
  createEvent,
  getEvents,
  getEvent,
  updateEvent,
  deleteEvent,
  getOrganizers,
  getSelfEvents,
};
