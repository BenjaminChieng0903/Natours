const express = require('express');
const userRouter = express.Router();
const {
  getAllusers,
  signup,
  getUser,
  deleteUser,
  login,
} = require('./../controllers/UsersController');

userRouter.route('/').get(getAllusers).post(signup);
userRouter.route('/login').post(login);
userRouter.route('/:id').get(getUser).delete(deleteUser);

module.exports = userRouter;
