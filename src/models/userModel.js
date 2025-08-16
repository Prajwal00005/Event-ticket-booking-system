import { USER } from "../constants/role.js";

const userModel = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      fullName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phoneNumber: {
        type: DataTypes.STRING, // safer to store phone as string
        allowNull: false,
      },
      age: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      roles: {
        type: DataTypes.JSON,
        allowNull: false,
        defaultValue: [USER],
      },

      token: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      tokenExpiry: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    { timestamps: true }
  );
  return User;
};

export default userModel;
