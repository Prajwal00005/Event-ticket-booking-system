import { USER } from "../constants/role.js";
import { db } from "../database/db.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import sendMail from "../utils/mailSender.js";
import { sendResetEmail } from "../mailTemplate/Resettemplate.js";

const signup = async (data) => {
  const existingUser = await db.User.findOne({ where: { email: data.email } });

  if (existingUser) throw new Error("User already exists");

  const hashedPassword = await bcrypt.hash(data.password, 10);

  return await db.User.create({
    fullName: data.fullName,
    address: data.address,
    age: data.age,
    phoneNumber: data.phoneNumber,
    email: data.email,
    password: hashedPassword,
    roles: [USER],
  });
};

const login = async (data) => {
  const user = await db.User.findOne({ where: { email: data.email } });

  if (!user) throw new Error("Wrong credentials");

  const match = await bcrypt.compare(data.password, user.password);

  if (!match) throw new Error("Wrong credentials");

  return user;
};

const changePassword = async ({ userId, currentPassword, newPassword }) => {
  const user = await db.User.findByPk(userId);

  if (!user) throw new Error("User not found");

  const isMatch = await bcrypt.compare(currentPassword, user.password);

  if (!isMatch) throw new Error("Old password is incorrect");

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  await user.update({ password: hashedPassword });

  return true;
};

const forgotPassword = async (email) => {
  const user = await db.User.findOne({ where: { email: email } });
  if (!user) throw new Error("User not found");

  const token = crypto.randomUUID();

  const res = await sendMail(
    email,
    "Reset password link",
    sendResetEmail(token)
  );

  console.log(res);

  const tokenExpiry = new Date(Date.now() + 5 * 60 * 1000);

  await user.update({ token, tokenExpiry });
  return true;
};

const resetPassword = async ({ token, newPassword }) => {
  const user = await db.User.findOne({ where: { token: token } });

  if (!user) throw new Error("Invalid token");

  if (user.tokenExpiry < new Date()) throw new Error("Token expired");

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  await user.update({
    password: hashedPassword,
    token: null,
    tokenExpiry: null,
    otpAttempt: null,
  });

  return true;
};

export default { signup, login, changePassword, forgotPassword, resetPassword };
