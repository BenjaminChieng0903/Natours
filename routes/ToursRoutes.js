const express = require('express');
const tourRouter = express.Router();
const {
  getAlltours,
  addNewtours,
  getUserById,
  deleteUserById,
} = require('./../controllers/ToursController');

tourRouter.route('/').get(getAlltours).post(addNewtours);
tourRouter.route('/:id').get(getUserById).patch().delete(deleteUserById);

module.exports = tourRouter;
