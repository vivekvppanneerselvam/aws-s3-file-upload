const express = require('express');
const router = express.Router();

const multer = require("multer");
const { s3Uploadv2, s3Uploadv3 } = require("./s3Service");
const uuid = require("uuid").v4;

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (file.mimetype.split("/")[0] === "image") {
    cb(null, true);
  } else {
    cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE"), false);
  }
};

// ["image", "jpeg"]

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 1000000000, files: 2 },
});
router.post('/upload', upload.array("file"), async function (req, res, next) {
    try {
        const results = await s3Uploadv2(req.files);
        console.log("hehehe",results);
        return res.json({ status: "success" });
      } catch (err) {
        console.log(err);
      }
})

module.exports = router;