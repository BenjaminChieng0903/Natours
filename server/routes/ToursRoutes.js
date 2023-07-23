const express = require('express');
const tourRouter = express.Router();
const {
  getAlltours,
  createNewTour,
  getTourById,
  deleteTourById,
  updateTour,
  getTourStats,
  CaculatebusinessMonth,
} = require('./../controllers/ToursController');
const {
  routeProtect,
  restrictedRole,
} = require('./../controllers/authController');

tourRouter.route('/').get(getAlltours).post(createNewTour);
tourRouter.route('/get-tour-stats').get(getTourStats);
tourRouter.route('/businessMonth').get(CaculatebusinessMonth);
tourRouter
  .route('/:id')
  .get(getTourById)
  .post(updateTour)
  .delete(routeProtect, restrictedRole('admin', 'lead-guide'), deleteTourById);

module.exports = tourRouter;
