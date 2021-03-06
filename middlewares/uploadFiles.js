const AWS = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: process.env.AWS_REGION,
});

const uploadFiles = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_BUCKET_NAME,
    key: function (req, file, cb) {
      try {
        const fileType = file.mimetype.split("/")[0];
        const fileNameArray = file.originalname.split(".");

        cb(
          null,
          `${fileType}${Date.now()}.${fileNameArray[fileNameArray.length - 1]}`
        );
      } catch (err) {
        console.err(err);
      }
    },
    acl: "public-read",
  }),
});

module.exports = uploadFiles;
