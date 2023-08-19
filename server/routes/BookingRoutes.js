const express = require('express');
const {
  createCheckoutSession,
  createBooking,
} = require('../controllers/bookingController');
const { routeProtect } = require('../controllers/authController');

const bookingRouter = express.Router();

bookingRouter
  .route('/checkout-session/:id')
  .get(routeProtect, createCheckoutSession)
  .post(createBooking);

module.exports = bookingRouter;
