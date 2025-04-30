import multer from "multer";
import path from "path";
// import multerS3 from 'multer-s3';
// import s3 from '../config/s3';

const upload = multer({
  storage: multer.diskStorage({
    destination: function (_req, _file, cb) {
      cb(null, "public/uploads");
    },
    filename: function (_req, file, cb) {
      cb(null, "upload_at_" + Date.now() + path.extname(file.originalname));
    },
  }),
  //   dest: 'uploads/'
  // storage: multerS3({
  //     s3: s3,
  //     bucket: process.env.S3_BUCKET_NAME!,
  //     acl: 'public-read',
  //     contentType: multerS3.AUTO_CONTENT_TYPE,
  //     key: (req, file, cb) => {
  //         cb(null, `uploads/${Date.now().toString()}_${file.originalname}`);
  //     },
  // }),
});

export const uploadFileMiddleware = upload.array("images", 5); // Accepts up to 5 images
