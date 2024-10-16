const { v2: cloudinary } = require("cloudinary");
const fs = require("fs");

async function uploadFileOnCloudinary(filePath) {
  // Configuration
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  // Upload a file
  const uploadResult = await cloudinary.uploader
    .upload(filePath, {
      resource_type: "auto",
    })
    .catch((error) => {
      fs.unlinkSync(filePath);
      console.log(error);
      return null;
    });

  if (uploadResult) {
    console.log(uploadResult);
    if (filePath !== "public\\uploads\\dummy_blog.jpg") {
      fs.unlinkSync(filePath);
    }
    return uploadResult.url;
  } else {
    return null;
  }

  // Optimize delivery by resizing and applying auto-format and auto-quality
  // const optimizeUrl = cloudinary.url("shoes", {
  //   fetch_format: "auto",
  //   quality: "auto",
  // });

  //   console.log(optimizeUrl);

  // Transform the image: auto-crop to square aspect_ratio
  // const autoCropUrl = cloudinary.url("shoes", {
  //     crop: "auto",
  //     gravity: "auto",
  //     width: 500,
  //     height: 500,
  // });

  // console.log(autoCropUrl);
}

module.exports = uploadFileOnCloudinary;
