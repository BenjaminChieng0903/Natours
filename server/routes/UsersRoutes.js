const express = require('express');
const multer = require('multer');
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'https://api.imgbb.com/1/upload');
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
//     cb(
//       null,
//       file.fieldname +
//         '-' +
//         uniqueSuffix +
//         '.' +
//         file.originalname.split('.')[1]
//     );
//   },
// });
// const fileFilter = (req, file, cb) => {
//   if (file.mimetype.startsWith('image')) {
//     cb(null, true);
//   } else {
//     cb(new AppError('Not a image! Please upload only images.', 400), false);
//   }
// };
// const upload = multer({
//   storage,
//   fileFilter,

// });
// const upload = multer({ dest: './../public/img/users',  });
// const storage =
const userRouter = express.Router();

const {
  getAllusers,
  getUser,
  deleteUser,
  updateMe,
  updateCheck,
} = require('./../controllers/UsersController');
const {
  signup,
  login,
  forgetPassword,
  resetPassword,
  routeProtect,
  updatePassword,
} = require('./../controllers/authController');

userRouter.route('/').get(getAllusers).post(signup);
userRouter.route('/login').post(login);
userRouter.route('/forgetPassword').post(forgetPassword);
userRouter.route('/resetPassword/:token').patch(resetPassword);
userRouter.route('/updateMyPassword').patch(routeProtect, updatePassword);
userRouter.route('/account/updateMe').patch(updateCheck, updateMe);
userRouter.route('/:id').get(getUser).delete(deleteUser);

module.exports = userRouter;
