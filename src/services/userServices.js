import { USER, MERCHANT } from "../constants/role.js";
import { db } from "../database/db.js";
import bcrypt from "bcryptjs";

const createMerchant = async (data) => {
  try {
    const existingUser = await db.User.findOne({
      where: { email: data.email },
    });

    if (existingUser) throw new Error("User already exists");

    const password = "Nepal" + data.phoneNumber;

    const hashedPassword = await bcrypt.hash(password, 10);

    const createdUser = await db.User.create({
      fullName: data.fullName,
      phoneNumber: data.phoneNumber,
      email: data.email,
      age: data.age,
      address: data.address,
      password: hashedPassword,
      roles: [USER, MERCHANT],
    });

    return createdUser;
  } catch (e) {
    throw new Error(e.message);
  }
};

const deleteUser = async (id) => {
  try {
    const deletedCount = await db.User.destroy({ where: { id } });

    if (!deletedCount) throw new Error("User not found or failed to delete");

    return true;
  } catch (e) {
    throw new Error(e.message);
  }
};

const getAllUsers = async () => {
  return await db.User.findAll();
};

const getUserById = async ({ id }) => {
  const user = await db.User.findByPk(id);

  if (!user) throw new Error("User not found");

  return user;
};

const updateUser = async ({ id, updateData }) => {
  const user = await db.User.findByPk(id);

  if (!user) throw new Error("User not found");

  await user.update(updateData);

  return user;
};

export default {
  createMerchant,
  updateUser,
  deleteUser,
  getAllUsers,
  getUserById,
};
