const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const User = require('./../models/userModels');
exports.getAllusers = (req, res) => {
  res.status(200).json({
    status: 'success',
    date: new Date(),
    data: users,
  });
};
exports.createUser = async (req, res) => {
  const newUser = await User.create(req.body);
  // if (!newTour) {
  //   return next();
  // }
  res.status(201).json({
    status: 'success',
    data: {
      tour: newUser,
    },
  });
};
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
// exports.updateUser = (req, res, next) => {
//   console.log(req.body);
//   next();
// };
exports.updateCheck = catchAsync(async (req, res, next) => {
  console.log(req.body);
  // console.log(Object.keys(req.body).length);
  //If name and photo are all undefined, it will not show up in the body. In this case,
  //the req.body only contain id. And this means do nothing.
  if (Object.keys(req.body).length === 1) {
    return next(
      new AppError('No update, please change photo or name again', 400)
    );
  }
  next();
});

exports.updateMe = async (req, res, next) => {
  const { id } = req.body;
  console.log(req.body);

  await User.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status: 'success',
  });

  // else
  //   res.status(400).json({
  //     status: 'failed',
  //     message: 'Do not provide photo, please choose one',
  //   });
};

exports.deleteUser = (req, res) => {};
