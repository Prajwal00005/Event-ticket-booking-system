import userServices from "../services/userServices.js";

export const createMerchant = async (req, res) => {
  try {
    const { fullName, phoneNumber, email, age, address } = req.body;

    if (!fullName || !phoneNumber || !email || !age || !address) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    const user = await userServices.createMerchant(req.body);

    return res
      .status(201)
      .json({ success: true, message: "Merchant created", user });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: error.message || "Server error" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id)
      return res
        .status(400)
        .json({ success: false, message: "User ID required" });

    const deleted = await userServices.deleteUser(id);

    if (!deleted)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    return res.json({ success: true, message: "User deleted" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: error.message || "Server error" });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await userServices.getAllUsers();

    return res.json(users);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: error.message || "Server error" });
  }
};

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id)
      return res
        .status(400)
        .json({ success: false, message: "User ID required" });

    const user = await userServices.getUserById({ id });

    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    return res.json(user);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: error.message || "Server error" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id)
      return res
        .status(400)
        .json({ success: false, message: "User ID required" });

    const { email, phoneNumber, ...updateData } = req.body;

    // console.log(updateData);

    const updatedUser = await userServices.updateUser({ id, updateData });

    if (!updatedUser)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    return res.json({
      success: true,
      message: "User updated",
      user: updatedUser,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: error.message || "Server error" });
  }
};

export default {
  createMerchant,
  updateUser,
  deleteUser,
  getAllUsers,
  getUserById,
};
