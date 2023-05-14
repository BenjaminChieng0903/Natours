const express = require('express');
const morgan = require('morgan');
const app = express();
const tourRouter = require('./routes/ToursRoutes');
const userRouter = require('./routes/UsersRoutes');
// Middleware
app.use(express.json());
app.use(morgan('dev'));
app.use('/api/v1/tours', tourRouter); //the router is mounting on the url
app.use('/api/v1/users', userRouter);

module.exports = app;
// route handler
// const getAlltours = (req, res) => {
//   res.status(200).json({
//     status: 'success',
//     date: new Date(),
//     data: tours,
//   });
// };
// const addNewtours = (req, res) => {
//   console.log(req.body);
//   const newTourID = tours.length - 1 + 1;
//   const newTour = Object.assign({ id: newTourID }, req.body);
//   // console.log(tours);
//   tours.push(newTour);
//   fs.writeFile(
//     `${__dirname}/dev-data/data/tours-simple.json`,
//     JSON.stringify(tours),
//     (err) => {
//       res.status(201).json({
//         status: 'success',
//         data: new Date(),
//         data: newTour,
//       });
//     }
//   );
// };
//routes
// const tourRouter = express.Router();
// app.use('/api/v1/tours', tourRouter);
// tourRouter.route('/').get(getAlltours).post(addNewtours);

// const findTour = (id) => {
//   return tours.find((el) => el.id === id);
// };
// const deleteTour = (id) => tours.splice(id, 1);

// const getUserById = (req, res) => {
//   const { id } = req.params;
//   const selectedTour = findTour(+id);
//   res.status(200).json({
//     status: 'success',
//     date: new Date(),
//     data: selectedTour,
//   });
// };
// const deleteUserById = (req, res) => {
//   const { id } = req.params;
//   if (id > tours.length) {
//     res.status(404).json({
//       status: 'fail',
//       date: new Date(),
//       data: 'Invalid ID',
//     });
//   }
//   deleteTour(+id);
//   res.status(200).json({
//     status: 'success',
//     date: new Date(),
//     data: 'null',
//   });
// };

// tourRouter.route('/:id').get(getUserById).patch().delete(deleteUserById);

// const port = 3000;
// app.listen(port, () => {
//   console.log(`server is running on ${port} `);
// });
