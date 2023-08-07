const AppError = require('../utils/appError');

const nonOperationalTemplate = (error, res) => {
  res.status(error.statusCode).json({
    status: error.status,
    statusCode: error.statusCode,
    message: error.message,
    error,
  });
};
const castError = (err) => {
  return new AppError(`Invalid ID ${err.stringValue}`, 400);
};
const duplicateFields = (err) => {
  const message = `fields "${
    Object.keys(err.keyValue)[0]
  }" value has already exist, please change`;

  return new AppError(message, 400);
};
const validatorError = (err) => {
  const message = err.message.split(':')[2];
  return new AppError(message, 400);
};
const JwtError = (err) => {
  return new AppError(err.message, 401);
};
const JwtExpiredError = (err) => {
  return new AppError(err.message, 400);
};
exports.globalErrorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  // if error is an appError, then it must have status, statusCode.
  //For other internal error, we will fill their status and statusCode here.
  if (process.env.NODE_ENV === 'development') {
    res.status(err.statusCode).json({
      status: err.status,
      statusCode: err.statusCode,
      message: err.message,
      err,
    });
  } else if (process.env.NODE_ENV === 'production') {
    //In production mode, if it is an operational error, we sent error message back to client
    if (err.isOperational) {
      res.status(err.statusCode).json({
        status: err.status,
        statusCode: err.statusCode,
        message: err.message,
      });
    }
    //Otherwise if it is a internal error, we don't have to tell client why it is wrong.
    else {
      //Handle invalid ID, that is castError
      if (err.name === 'CastError') {
        const error = castError(err);
        nonOperationalTemplate(error, res);
      }
      //Handle duplicate fields
      else if (err.code && err.code === 11000) {
        const error = duplicateFields(err);
        nonOperationalTemplate(error, res);
      }
      //Handle validation error
      else if (err.name === 'ValidationError') {
        const error = validatorError(err);
        nonOperationalTemplate(error, res);
      } else if (err.name === 'JsonWebTokenError') {
        const error = JwtError(err);
        nonOperationalTemplate(error, res);
      } else if (err.name === 'TokenExpiredError') {
        const error = JwtExpiredError(err);
        nonOperationalTemplate(error, res);
      }
      //Default: 500 Internal error
      else {
        res.status(err.statusCode).json({
          status: err.status,
          statusCode: err.statusCode,
          message: 'something went wrong!',
          err,
        });
      }
    }
  }
};
