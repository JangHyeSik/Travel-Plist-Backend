const AWS = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");

AWS.config.loadFromPath(__dirname + "../../config/awsConfig.json");
const s3 = new AWS.S3();

const uploadFiles = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_BUCKET_NAME,
    key: function (req, file, cb) {
      try {
        const fileType = file.mimetype.split("/")[0];

        if (fileType !== "image" && fileType !== "audio") {
          return cb(new Error(`Not ${fileType}`));
        }

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
