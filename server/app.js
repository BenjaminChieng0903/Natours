const express = require('express');
const morgan = require('morgan');
const app = express();
const tourRouter = require('./routes/ToursRoutes');
const userRouter = require('./routes/UsersRoutes');
const AppError = require('./utils/appError');
const { globalErrorHandler } = require('./controllers/errorController');
const cors = require('cors');
// Middleware
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));
app.use(cors());
app.use('/api/v1/tours', tourRouter); //the router is mounting on the url
app.use('/api/v1/users', userRouter);
//Error handling on unhandled route
app.all('*', (req, res, next) => {
  const err = new AppError(`cannot find this ${req.url} on the server`, 404);

  next(err);
});

//Global error catching handler
app.use(globalErrorHandler);

module.exports = app;
