const multer = require('multer');
const path = require('path');
const { ensureFolderExists } = require('../utils');

const storage = multer.diskStorage({
  destination: async function (req, file, cb) {
    const folderPath = path.join(__dirname, '../uploads');
    await ensureFolderExists(folderPath);
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname); // Get file extension
    cb(null, Date.now() + ext); // Rename file to avoid conflicts
  }
});

// Initialize multer with the configured storage
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit for image size
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);
    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files are allowed.'));
    }
  }
});

module.exports = upload;
