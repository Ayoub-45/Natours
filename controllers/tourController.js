const Tour = require('../models/tourModel');
/*
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`),
);*/
exports.createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);
    res.status(201).json({
      status: 'data recieved',
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    console.log(
      'There was an error creating your Document Tour :',
      err.message,
    );
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.updateTour = function (request, response) {
  response.status(200).json({
    status: 'success',
    data: {
      tour: 'Tour updated',
    },
  });
};
exports.deleteTour = function (request, response) {
  response.status(204).json({
    status: 'success',
    data: null,
  });
};

exports.getAllTours = function (request, response) {
  /*response.status(200).json({
    requestedAt: request.requestedTime,
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
  */
};
exports.getTour = function (request, response) {
  /*const tour = tours[request.params.id];
  response.status(200).json({
    status: 'success',
    result: 1,
    data: {
      tour,
    },
  });
  */
};
