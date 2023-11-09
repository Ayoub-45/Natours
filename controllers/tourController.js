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

exports.updateTour = async (request, response) => {
  try {
    const tour = await Tour.findByIdAndUpdate(request.params.id, request.body, {
      new: true,
      runValidaters: true,
    });
    response.status(200).json({
      status: 'Success',
      data: {
        message: 'data updated successfully',
        tour,
      },
    });
  } catch (err) {
    response.status(400).json({
      status: 'error',
      data: {
        status: 'fail',
        Error: err,
      },
    });
  }
};
exports.deleteTour = async (request, response) => {
  try {
    const tour = await Tour.findByIdAndDelete(request.params.id);

    response.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (err) {
    response.status(400).json({
      status: 'fail',
      data: {
        err,
      },
    });
  }
};

exports.getAllTours = async (request, response) => {
  try {
    const tours = await Tour.find();
    response.status(200).json({
      status: 'success',
      data: {
        tours,
      },
    });
  } catch (error) {
    response.status(400).json({
      status: 'error',
      data: {
        status: 'fail',
        Error: error.message,
      },
    });
  }
};
exports.getTour = async (request, response) => {
  try {
    const tour = await Tour.findById(request.params.id);
    response.status(200).json({
      status: 'success',
      data: tour,
    });
  } catch (error) {
    response.status(404).json({
      status: 'fail',
      error: error.message,
    });
  }
};
