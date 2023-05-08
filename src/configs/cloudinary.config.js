import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "profile_pictures",
    format: async (req, file) => {
      let format;
      switch (file.mimetype) {
        case "image/jpeg":
          format = "jpg";
          break;
        case "image/png":
          format = "png";
          break;
        case "image/gif":
          format = "gif";
          break;
        default:
          format = "jpg";
          break;
      }
      return format;
    },
  },
});

const upload = multer({ storage: storage });