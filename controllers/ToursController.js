const Tour = require('../models/tourModels');
const AppError = require('../utils/appError');

//fn should be an async function
const catchAsync = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch((err) => next(err));
  };
};

exports.createNewTour = catchAsync(async (req, res, next) => {
  const newTour = await Tour.create(req.body);
  // if (!newTour) {
  //   return next();
  // }
  res.status(201).json({
    status: 'success',
    data: {
      tour: newTour,
    },
  });
});
exports.getAlltours = catchAsync(async (req, res, next) => {
  // console.log(req.query);
  //query filter
  let queryItems = { ...req.query };
  console.log(queryItems);
  const excludeFields = ['page', 'sort', 'limit', 'fields'];
  excludeFields.forEach((el) => delete queryItems[el]);
  console.log(queryItems);
  //json to string
  let queryString = JSON.stringify(queryItems);
  queryString = queryString.replace(
    /\b(gte|gt|lte|lt)\b/g,
    (match) => `$${match}`
  );

  //string to json
  queryItems = JSON.parse(queryString);
  console.log(queryItems);

  let tours = Tour.find(queryItems);
  // sorting
  if (req.query.sort) {
    //   tours = Tour.sort(queryItem);
    const reqSort = req.query.sort.split(',').join(' ');
    tours = tours.sort(reqSort);
  } else {
    tours = tours.sort('CreateAt');
  }
  //limit
  if (req.query.limit) {
    tours = tours.limit(+req.query.limit);
    if (req.query.page) {
      const page = req.query.page - 1;
      const limit = +req.query.limit;
      const skip = page * limit;
      tours = tours.skip(skip).limit(limit);
    }
  }

  const result = await tours;

  res.status(200).json({
    status: 'success',
    results: result.length,
    date: new Date(),
    data: result,
  });
});

exports.getTourById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const selectedTour = await Tour.findById(id);
  // console.log(selectedTour);
  if (!selectedTour) {
    const err = new AppError('cannot find the tour with this ID', 404);
    return next(err);
  }
  res.status(200).json({
    status: 'success',
    date: new Date(),
    data: selectedTour,
  });
});

exports.updateTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!tour) {
    return next(
      new AppError('cannot find and update the tour with this ID', 404)
    );
  }
  res.status(201).json({
    status: 'success',
    data: {
      tour,
    },
  });
});
// const deleteTour = (id) => tours.splice(id, 1);

exports.deleteTourById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const tour = await Tour.findByIdAndDelete(id);
  if (!tour) {
    return next(
      new AppError('cannot find and delete the tour with this ID', 404)
    );
  }
  res.status(200).json({
    status: 'success',
    date: new Date(),
    data: 'null',
  });
});

exports.getTourStats = async (req, res) => {
  try {
    const tourStats = await Tour.aggregate([
      {
        $match: {
          ratingsAverage: { $gte: 4.5 },
        },
      },
      {
        $group: {
          _id: null,
          numTours: { $sum: 1 },
          sumRatingQuantity: { $sum: '$ratingsQuantity' },
          avgPrice: { $avg: '$price' },
          avgRating: { $avg: '$ratingsAverage' },
        },
      },
    ]);

    res.status(200).json({
      status: 'success',
      date: new Date(),
      stats: tourStats,
    });
  } catch (err) {
    res.status(400).json({
      status: 'failed',
      message: err,
    });
  }
};

exports.CaculatebusinessMonth = async (req, res) => {
  try {
    const year = req.query.year;
    // console.log(year);
    const result = await Tour.aggregate([
      {
        $unwind: '$startDates',
      },
      {
        $match: {
          startDates: {
            $gte: new Date(`${year}-01-01`),
            $lte: new Date(`${year}-12-31`),
          },
        },
      },
      {
        $group: {
          _id: { $month: '$startDates' },
          numTours: { $sum: 1 },
          //   countTours: { $count: {} },
          tourName: {
            $push: '$name',
          },
        },
      },
    ]);
    res.status(200).json({
      status: 'success',
      results: result.length,
      date: new Date(),
      stats: result,
    });
  } catch (err) {
    res.status(400).json({
      status: 'failed',
      message: err,
    });
  }
};
