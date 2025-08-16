import { v2 as cloudinary } from "cloudinary";

const folder = "ETBS";

const uploadFiles = async (files) => {
  try {
    const uploadResults = [];

    for (const file of files) {
      const result = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream({ folder }, (error, data) => {
            if (error) return reject(error);
            resolve(data);
          })
          .end(file.buffer);
      });
      uploadResults.push(result);
    }

    return uploadResults;
  } catch (e) {
    console.log(e.message);
    throw new Error("File upload failed");
  }
};

export default uploadFiles;
