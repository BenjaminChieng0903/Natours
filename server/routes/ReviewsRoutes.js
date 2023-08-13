const express = require('express');
const {
  getAllReviews,
  createReview,
  getSomeReviews,
} = require('../controllers/reviewsController');
const reviewsRouter = express.Router();

reviewsRouter.route('/').get(getAllReviews).post(createReview);
//this id is tour id instead of review id
reviewsRouter.route('/:id').get(getSomeReviews);

module.exports = reviewsRouter;
