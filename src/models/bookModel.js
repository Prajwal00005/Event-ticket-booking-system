const Booking = (sequelize, DataTypes) => {
  return sequelize.define(
    "Booking",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      ticketId: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      status: {
        type: DataTypes.ENUM("booked", "canceled", "pending"),
        defaultValue: "pending",
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      eventId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "Events",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      paymentId: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
          model: "Payments",
          key: "id",
        },
        onDelete: "CASCADE",
      },
    },
    {
      timestamps: true,
    }
  );
};

export default Booking;
