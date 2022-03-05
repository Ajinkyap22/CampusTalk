const multer = require("multer");
const path = require("path");

// storage for images
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/images");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

// storage for docs
const storageDocs = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/docs");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

// storage for videos
const storageVideos = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/videos");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

// Init upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 10000000 },
  fileFilter: function (req, file, cb) {
    // Check file extension
    const types = /jpg|jpeg|png|gif/;
    const extension = types.test(path.extname(file.originalname));
    // Check MIME
    const mime = types.test(file.mimetype);

    return extension && mime ? cb(null, true) : cb("Error: Images only!");
  },
});

const uploadDocs = multer({
  storage: storageDocs,
  limits: { fileSize: 10000000 },
  fileFilter: function (req, file, cb) {
    // Check file extension
    const types = /pdf|doc|docx|ppt|pptx|xls|xlsx/;
    const extension = types.test(path.extname(file.originalname));
    // Check MIME
    const mime = types.test(file.mimetype);

    return extension && mime ? cb(null, true) : cb("Error: Documents only!");
  },
});

const uploadVideos = multer({
  storage: storageVideos,
  limits: { fileSize: 50000000 },
  fileFilter: function (req, file, cb) {
    // check file extensio
    const types = /mp4|MPEG-4|mkv/;
    const extension = types.test(path.extname(file.originalname));
    // Check MIME
    const mime = types.test(file.mimetype);

    return extension && mime ? cb(null, true) : cb("Error: Videos only!");
  },
});

module.exports = { upload, uploadDocs, uploadVideos };
