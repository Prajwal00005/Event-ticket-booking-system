import { v2 as cloudinary } from "cloudinary";
import config from "./index.js";

const connectCloudinary = async (req, res) => {
  try {
    await cloudinary.config({
      cloud_name: config.cloudinary.cloudName,
      api_key: config.cloudinary.apiKey,
      api_secret: config.cloudinary.apiSecret,
    });

    console.log("cloudinary connected sucessfully");
  } catch (e) {
    console.log(e.message);
  }
};

export default connectCloudinary;
