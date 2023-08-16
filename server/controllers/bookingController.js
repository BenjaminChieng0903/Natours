const AppError = require('../utils/appError');
const catchAsync = require('./../utils/catchAsync');
const Booking = require('./../models/bookingModel');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Tour = require('./../models/tourModels');
exports.createCheckoutSession = catchAsync(async (req, res, next) => {
  const tourId = req.params.id;
  console.log(tourId);
  const searchedTour = await Tour.findById({ _id: tourId });
  console.log(searchedTour);
  console.log(req.protocol + '://' + req.get('User-Agent'));
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    success_url: `${req.protocol}://${req.get('User-Agent')}/`,
    cancel_url: `${req.protocol}://${req.get('User-Agent')}/`,
    customer_email: req.currentUser.email,
    client_reference_id: tourId,
    line_items: [
      {
        name: `${searchedTour.name} Tour`,
        description: searchedTour.summary,
        images: [``],
        amount: searchedTour.price,
        currency: 'usd',
        quantity: 1,
      },
    ],
  });
  res.status(200).json({
    status: 'success',
    session,
  });
});
