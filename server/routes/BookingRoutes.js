const express = require('express');
const { createCheckoutSession } = require('../controllers/bookingController');
const { routeProtect } = require('../controllers/authController');

const bookingRouter = express.Router();

bookingRouter.route('/checkout-session/:id').get(createCheckoutSession);

module.exports = bookingRouter;
