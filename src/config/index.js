import dotenv from "dotenv";

dotenv.config();

const config = {
  port: process.env.PORT || 5000,
  projectName: process.env.PROJECT_NAME,
  version: process.env.PROJECT_VERSION,
  jwtSecret: process.env.JWT_SECRET,
  mailApi: process.env.RESEND_API,
  cloudinary: {
    apiKey: process.env.CLOUDINARY_API_KEY,
    apiSecret: process.env.CLOUDINARY_API_SECRET,
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
  },
};

export default config;
