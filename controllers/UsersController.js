const AppError = require('../utils/appError');
const User = require('./../models/userModels');
const catchAsync = require('./../utils/catchAsync');
const JWT = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
// const users = JSON.parse(
//   fs.readFileSync(`${__dirname}/../dev-data/data/users.json`)
// );

exports.getAllusers = (req, res) => {
  res.status(200).json({
    status: 'success',
    date: new Date(),
    data: users,
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create(req.body);
  const token = JWT.sign({ id: newUser._id }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });
  res.status(201).json({
    status: 'success',
    token,
    data: {
      user: newUser,
    },
  });
});
exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  //if user do not fill email and password, then throw the error.
  if (!email || !password) {
    return next(new AppError('please provide email and password', 400));
  }
  //if user do provide the email and password, then check if email and password exist in the database.
  const Searcheduser = await User.findOne({ email });
  if (!Searcheduser) {
    return next(
      new AppError('Incorrect email or password, please try again!', 400)
    );
  } else {
    // console.log(password, Searcheduser.password);
    const correct = await bcrypt.compare(password, Searcheduser.password);

    if (!correct) {
      return next(
        new AppError('Incorrect email or password, please try again!', 400)
      );
    }
  }
  const token = JWT.sign({ id: Searcheduser._id }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });
  //if all good, then send the token to user.
  res.status(200).json({
    status: 'success',
    token,
    user: Searcheduser,
  });
});
const searchID = (id) => {
  return users.find((el) => el._id === id);
};
exports.getUser = (req, res) => {
  const { id } = req.params;
  const selectedID = searchID(id);
  if (!selectedID) {
    return res.status(404).json({
      status: 'failed',
      date: new Date(),
      message: 'Invalid ID',
    });
  }
  res.status(200).json({
    status: 'success',
    date: new Date(),
    data: selectedID,
  });
};

exports.deleteUser = (req, res) => {};
