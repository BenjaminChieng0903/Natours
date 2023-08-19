const AppError = require('../utils/appError');
const catchAsync = require('./../utils/catchAsync');
const Booking = require('./../models/bookingModel');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Tour = require('./../models/tourModels');
exports.createCheckoutSession = catchAsync(async (req, res, next) => {
  const tourId = req.params.id;
  //   console.log(tourId);
  const searchedTour = await Tour.findById({ _id: tourId });
  //   console.log(searchedTour);
  console.log(req.get('Referer'));
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    success_url: `${req.get('Referer')}`,
    cancel_url: `${req.get('Referer')}details`,
    customer_email: req.currentUser.email,
    client_reference_id: tourId,
    line_items: [
      {
        price_data: {
          unit_amount: searchedTour.price * 100,
          currency: 'usd',
          product_data: {
            name: `${searchedTour.name} Tour`,
            description: searchedTour.summary,
            // images: [``],
          },
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
  });

  res.status(200).json({
    status: 'success',
    session,
  });
});
exports.createBooking = catchAsync(async (req, res, next) => {
  console.log(req.params);
  const booking = await Booking.create({ ...req.body, tour: req.params.id });

  res.status(200).json({
    status: 'success',
    data: booking,
  });
});
