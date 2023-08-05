const AppError = require('../utils/appError');
const User = require('./../models/userModels');
const catchAsync = require('./../utils/catchAsync');
const JWT = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const sendEmail = require('./../utils/sendEmail');
const crypto = require('crypto');

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
  console.log(email, password);
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

const compareTimeStamp = (passwordChangeTimeStamp, jwtTimeStamp) => {
  return passwordChangeTimeStamp < jwtTimeStamp;
};
exports.routeProtect = catchAsync(async (req, res, next) => {
  // check if the token exist
  const token = req.headers.authorization;
  if (!token) {
    return next(
      new AppError('it is a protected route, please log in first', 401)
    );
  }
  const userToken = token.split(' ')[1];
  // vertification of token
  const decodedToken = JWT.verify(userToken, process.env.JWT_SECRET, {
    complete: true,
  });

  console.log(decodedToken);
  // check if the user exist based on info from decoded payload
  const searchedUser = await User.findOne({ _id: decodedToken.payload.id });
  console.log(searchedUser);
  if (!searchedUser) {
    return next(new AppError('user does not exist', 404));
  }
  // check if password changed after getting token
  if (searchedUser.changePasswordAt) {
    const passwordChangeTimeStamp =
      searchedUser.changePasswordAt.getTime() / 1000;
    const jwtTimeStamp = decodedToken.payload.iat;
    if (!compareTimeStamp(passwordChangeTimeStamp, jwtTimeStamp)) {
      return next(
        new AppError(
          'user changed password after log in, please log in again',
          401
        )
      );
    }
  }
  req.currentUser = searchedUser;
  next();
});

exports.forgetPassword = catchAsync(async (req, res, next) => {
  // the user will click the link that navigate to new page
  // and they will fill their account email. The server will send a notification
  // to their email

  //1. get the user email
  const email = req.body.email;
  const searchedUser = await User.findOne({ email });
  if (!searchedUser || !email) {
    return next(
      new AppError('no email with the user, please fill out the email', 400)
    );
  }
  //2. generate the random password reset token
  const plainToken = searchedUser.createResetToken();

  await searchedUser.save({ validateBeforeSave: false });

  //3. Send it to the user email
  try {
    const resetURL = `${req.protocol}://${req.get(
      'host'
    )}/api/v1/users/resetPassword/${plainToken}`;
    const text = `Forget your password? Submmit a PATCH request with your new password and passwordConfirm to: ${resetURL}`;

    await sendEmail({
      email: searchedUser.email,
      subject: 'Your password token valid in 15 mins',
      text,
    });

    res.status(200).json({
      status: 'success',
      message: 'Token sent to email',
    });
  } catch (err) {
    (searchedUser.resetPasswordToken = undefined),
      (searchedUser.resetPasswordTokenExpire = undefined);
    await searchedUser.save({ validateBeforeSave: false });

    return next(
      new AppError('There was something wrong when send the email', 500)
    );
  }
  //   next();
});
exports.resetPassword = catchAsync(async (req, res, next) => {
  //1. get user based on token
  const { token: plainToken } = req.params;

  const encryptedToken = crypto
    .createHash('sha256')
    .update(plainToken)
    .digest('hex');

  //2. check if the token is expired
  const searchedUser = await User.findOne({
    resetPasswordToken: encryptedToken,
  });

  if (Date.now() > searchedUser.resetPasswordTokenExpire) {
    return next(
      new AppError('reset password token has expired, please try again!', 403)
    );
  }
  //3. change new password
  searchedUser.password = req.body.password;
  searchedUser.passwordConfirm = req.body.passwordConfirm;
  searchedUser.resetPasswordToken = undefined;
  searchedUser.resetPasswordTokenExpire = undefined;
  //4. set changePasswordAt
  await searchedUser.save();

  //5. log user in and send new JWT
  const newToken = JWT.sign({ id: searchedUser._id }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });
  res.status(200).json({
    status: 'success',
    token: newToken,
    message: 'change to new password successfully!',
  });
});
exports.restrictedRole = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.currentUser.role)) {
      return next(
        new AppError('this user do not have permission to do this action', 403)
      );
    }
    next();
  };
};

exports.updatePassword = catchAsync(async (req, res, next) => {
  //   console.log(req.currentUser._id);
  const searchedUser = await User.findById({ _id: req.currentUser._id });
  //1. check if current password correct
  if (!bcrypt.compare(req.body.currentPassword, searchedUser.password)) {
    return next(
      new AppError('current password is wrong, please try again!', 403)
    );
  }
  //2. update password
  searchedUser.password = req.body.password;
  searchedUser.passwordConfirm = req.body.passwordConfirm;
  await searchedUser.save();
  //3. log user in, send new JWT
  const newToken = JWT.sign({ id: searchedUser._id }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });

  res.status(200).json({
    status: 'success',
    token: newToken,
    message: 'update password successfully!',
  });
});
