const User = require('./../models/userModels');
const catchAsync = require('./../utils/catchAsync');
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

  res.status(201).json({
    status: 'success',
    data: {
      user: newUser,
    },
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
