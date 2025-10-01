import sharp from "sharp";
import fs from "fs";
import FormData from "form-data";
import axios from "axios";
import path from "path";

export const removeBgImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    const imagePath = req.file.path;
    let convertedPath = imagePath;

    // AVIF conversion
    if (req.file.mimetype === "image/avif") {
      convertedPath = `${imagePath}.png`;
      await sharp(imagePath).png().toFile(convertedPath);
      fs.unlinkSync(imagePath);
    }
    console.log("Sending file:", convertedPath, fs.existsSync(convertedPath));


    const imageFile = fs.createReadStream(convertedPath);

    const formData = new FormData();
    formData.append("image_file", imageFile, {
      filename: path.basename(convertedPath),
      contentType: "image/png",
    });

    const { data } = await axios.post(
      "https://clipdrop-api.co/remove-background/v1",
      formData,
      {
        headers: {
          ...formData.getHeaders(),
          "x-api-key": process.env.CLIPDROP_API,
        },
        responseType: "arraybuffer",
      }
    );


    // Save result to uploads/removed/
    const removedDir = "uploads/removed/";
    if (!fs.existsSync(removedDir)) fs.mkdirSync(removedDir, { recursive: true });

    const outputFileName = `${Date.now()}_removed.png`;
    const outputPath = path.join(removedDir, outputFileName);

    fs.writeFileSync(outputPath, data);

    // Delete temp converted file
    if (convertedPath !== imagePath) fs.unlinkSync(convertedPath);

    // Return public path
    const publicURL = `/uploads/removed/${outputFileName}`;

    res.status(200).json({
      success: true,
      message: "Image background removed successfully",
      fileURL: publicURL,
    });
  } catch (error) {
    console.error("Remove BG Error:", error?.response?.data || error.message);
    return res.status(500).json({
      success: false,
      message: error?.response?.data?.error || error.message,
    });
  }
};



// // Using multer

// import axios from "axios";
// import FormData from "form-data";
// import User from "../models/UserModel.js";

// export const removeBgImage = async (req, res) => {
//     try {
//         const { userId } = req.user;

//         const userObj = await User.findById(userId);
//         if (!userObj) {
//             return res.status(404).json({ success: false, message: "User not found" });
//         }

//         if (!req.file) {
//             return res.status(400).json({ success: false, message: "No image uploaded" });
//         }

//         const formData = new FormData();
//         formData.append('image_file', req.file.buffer, {
//             filename: req.file.originalname,
//             contentType: req.file.mimetype
//         });

//         const { data, headers } = await axios.post(
//             'https://clipdrop-api.co/remove-background/v1',
//             formData,
//             {
//                 headers: {
//                     'x-api-key': process.env.CLIPDROP_API,
//                     ...formData.getHeaders()
//                 },
//                 responseType: 'arraybuffer'
//             }
//         );

//         // Set headers for file download
//         res.set({
//             'Content-Type': headers['content-type'] || 'application/octet-stream',
//             'Content-Disposition': `attachment; filename="no-bg-${req.file.originalname}"`
//         });

//         // Send the image data directly
//         res.send(Buffer.from(data, 'binary'));

//     } catch (error) {
//         res.status(500).json({ success: false, message: error.message });
//     }
// };
