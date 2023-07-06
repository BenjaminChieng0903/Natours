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
        res.status(500).json({
          status: err.status,
          statusCode: err.statusCode,
          message: `Invalid ID ${err.stringValue}`,
        });
      }
      res.status(500).json({
        status: err.status,
        statusCode: err.statusCode,
        message: 'something went wrong!',
      });
    }
  }
};
