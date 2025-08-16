import authServices from "../services/authServices.js";
import { createJWT } from "../utils/jwt.js";

const signup = async (req, res) => {
  try {
    const {
      fullName,
      phoneNumber,
      age,
      address,
      email,
      password,
      confirmPassword,
    } = req.body;

    if (
      !fullName ||
      !phoneNumber ||
      !age ||
      !address ||
      !email ||
      !password ||
      !confirmPassword
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (password != confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "confirm password must match password",
      });
    }

    const user = await authServices.signup(req.body);

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Signup failed",
      });
    }

    const payload = {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      roles: user.roles,
    };

    const token = createJWT(payload);

    res.cookie("authToken", token, {
      httpOnly: true,
      sameSite: "strict",
      // secure: true, // enable on HTTPS
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.status(201).json({
      success: true,
      message: "Signup successful",
      token,
      data: payload,
    });
  } catch (error) {
    console.error("Signup error:", error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const user = await authServices.login(req.body);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const payload = {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      roles: user.roles,
    };

    const token = createJWT(payload);

    res.cookie("authToken", token, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      data: payload,
    });
  } catch (error) {
    console.error("Login error:", error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const changePassword = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { currentPassword, newPassword, confirmPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Current password and new password are required",
      });
    }
    if (newPassword != confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "confirm password and new password must match",
      });
    }

    const success = await authServices.changePassword({
      userId,
      currentPassword,
      newPassword,
    });

    if (!success) {
      return res.status(400).json({
        success: false,
        message: "Password change failed",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    console.error("Change password error:", error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const success = await authServices.forgotPassword(email);

    if (!success) {
      return res.status(400).json({
        success: false,
        message: "Failed to process forgot password request",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Password reset instructions sent to your email",
    });
  } catch (error) {
    console.error("Forgot password error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to process forgot password",
    });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Token and new password are required",
      });
    }

    const success = await authServices.resetPassword({ token, newPassword });

    if (!success) {
      return res.status(400).json({
        success: false,
        message: "Reset password failed or token invalid",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Password reset successful",
    });
  } catch (error) {
    console.error("Reset password error:", error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export default { signup, login, changePassword, forgotPassword, resetPassword };
