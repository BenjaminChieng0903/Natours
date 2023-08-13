const express = require('express');
const {
  getAllReviews,
  createReview,
} = require('../controllers/reviewsController');
const reviewsRouter = express.Router();

reviewsRouter.route('/').get(getAllReviews).post(createReview);

module.exports = reviewsRouter;
