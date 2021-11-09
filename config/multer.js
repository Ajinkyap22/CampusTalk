const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads");
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

module.exports = upload;
