const express = require('express');
const userRouter = express.Router();
const {
  getAllusers,
  addNewusers,
  getUser,
  deleteUser,
} = require('./../controllers/UsersController');

userRouter.route('/').get(getAllusers).post(addNewusers);
userRouter.route('/:id').get(getUser).delete(deleteUser);
module.exports = userRouter;
