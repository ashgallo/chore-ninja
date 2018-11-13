const multer = require("multer");

module.exports = {
  upload: multer({
    dest: "./temp",
    limits: { fileSize: 10000000 }
  })
}