const express = require('express');
const {
  getAllReviews,
  createReview,
  getTourReviews,
  getUserReviews,
} = require('../controllers/reviewsController');
const reviewsRouter = express.Router();

reviewsRouter.route('/').get(getAllReviews).post(createReview);
//this id is tour id instead of review id
reviewsRouter.route('/:id').get(getTourReviews);
reviewsRouter.route('/user/:id').get(getUserReviews);

module.exports = reviewsRouter;
