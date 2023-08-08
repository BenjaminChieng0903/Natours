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
exports.uploadUserImage = async (req, res, next) => {
  const { id, photo } = req.body;
  // console.log(id);
  console.log(req.body);
  if (req.body) {
    await User.findByIdAndUpdate(
      id,
      { photo },
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json({
      status: 'success',
    });
  } else
    res.status(400).json({
      status: 'failed',
      message: 'Do not provide photo, please choose one',
    });
};

exports.deleteUser = (req, res) => {};
