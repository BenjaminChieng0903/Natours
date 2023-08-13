const Views = require('./../models/reviewsModel');
const AppError = require('../utils/appError');
const catchAsync = require('./../utils/catchAsync');
const Review = require('./../models/reviewsModel');

exports.getAllReviews = catchAsync(async (req, res, next) => {
  const reviews = await Views.find();
  res.status(200).json({
    status: 'success',
    length: reviews.length,
    data: {
      reviews,
    },
  });
});

exports.createReview = catchAsync(async (req, res, next) => {
  const newReviews = await Review.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      review: newReviews,
    },
  });
});
