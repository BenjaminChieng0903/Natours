const express = require('express');
const userRouter = express.Router();
const {
  getAllusers,
  getUser,
  deleteUser,
} = require('./../controllers/UsersController');
const { signup, login } = require('./../controllers/authController');

userRouter.route('/').get(getAllusers).post(signup);
userRouter.route('/login').post(login);
userRouter.route('/:id').get(getUser).delete(deleteUser);

module.exports = userRouter;
