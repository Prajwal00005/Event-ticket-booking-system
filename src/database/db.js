// connectdb.js
import { Sequelize, DataTypes } from "sequelize";
import userModel from "../models/userModel.js";
import eventModel from "../models/eventModel.js";
import bookingModel from "../models/bookModel.js";
import PaymentModel from "../models/paymentModel.js";

const sequelize = new Sequelize("EBS", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = userModel(sequelize, DataTypes);
db.Event = eventModel(sequelize, DataTypes);
db.Booking = bookingModel(sequelize, DataTypes);
db.Payment = PaymentModel(sequelize, DataTypes);

db.User.hasMany(db.Event, { foreignKey: "createdBy", as: "events" });
db.Event.belongsTo(db.User, { foreignKey: "createdBy", as: "creator" });

db.User.hasMany(db.Booking, { foreignKey: "userId", as: "bookings" });
db.Booking.belongsTo(db.User, { foreignKey: "userId", as: "user" });

db.Event.hasMany(db.Booking, { foreignKey: "eventId", as: "bookings" });
db.Booking.belongsTo(db.Event, { foreignKey: "eventId", as: "event" });

db.Payment.hasOne(db.Booking, { foreignKey: "paymentId", as: "booking" });
db.Booking.belongsTo(db.Payment, { foreignKey: "paymentId", as: "payment" });

const connectdb = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection established successfully.");
    await sequelize.sync({ force: false });
    console.log("All models synchronized successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

export default connectdb;
export { db };
