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
exports.updateUser = () => {};
exports.uploadUserImage = (req, res, next) => {
  if (req.file) {
    res.status(200).json({
      status: 'success',
    });
  } else
    res.status(400).json({
      status: 'failed',
    });
};

exports.deleteUser = (req, res) => {};
