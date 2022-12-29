const multer = require('multer');

// const ALLOWED_FORMATS = ['image/jpeg', 'image/png', 'image/jpg'];
const storage = multer.memoryStorage();
export const upload = multer({
  storage,
  // fileFilter: function(req, file, cb) {
  //   if (ALLOWED_FORMATS.includes(file.mimetype)) {
  //     cb(null, true);
  //   } else {
  //     cb(new Error('Not supported file type!'), false);
  //   }
  // }
}).single('img')

// export default upload;