const express = require('express');
const {
  createCheckoutSession,
  getMyBooking,
} = require('../controllers/bookingController');
const { routeProtect } = require('../controllers/authController');

const bookingRouter = express.Router();

bookingRouter
  .route('/checkout-session/:id')
  .get(routeProtect, createCheckoutSession);
bookingRouter.route('/mybooking/:id').get(getMyBooking);

module.exports = bookingRouter;
