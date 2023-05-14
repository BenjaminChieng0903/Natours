const fs = require('fs');
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);
exports.getAlltours = (req, res) => {
  res.status(200).json({
    status: 'success',
    date: new Date(),
    data: tours,
  });
};
exports.addNewtours = (req, res) => {
  console.log(req.body);
  const newTourID = tours.length - 1 + 1;
  const newTour = Object.assign({ id: newTourID }, req.body);
  // console.log(tours);
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: new Date(),
        data: newTour,
      });
    }
  );
};

const findTour = (id) => {
  return tours.find((el) => el.id === id);
};
const deleteTour = (id) => tours.splice(id, 1);

exports.getUserById = (req, res) => {
  const { id } = req.params;
  const selectedTour = findTour(+id);
  res.status(200).json({
    status: 'success',
    date: new Date(),
    data: selectedTour,
  });
};
exports.deleteUserById = (req, res) => {
  const { id } = req.params;
  if (id > tours.length) {
    res.status(404).json({
      status: 'fail',
      date: new Date(),
      data: 'Invalid ID',
    });
  }
  deleteTour(+id);
  res.status(200).json({
    status: 'success',
    date: new Date(),
    data: 'null',
  });
};
