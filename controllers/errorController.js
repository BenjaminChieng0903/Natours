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
  return new AppError(
    `fields "${Object.keys(err.keyValue)[0]}" with duplicate value`,
    400
  );
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
      if (err.code && err.code === 11000) {
        const error = duplicateFields(err);
        nonOperationalTemplate(error, res);
      }
      //Default: 500 Internal error
      res.status(err.statusCode).json({
        status: err.status,
        statusCode: err.statusCode,
        message: 'something went wrong!',
        err,
      });
    }
  }
};
