const fs = require('fs');
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);
exports.createTour = function (req, res) {
  // console.log(req.body);
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
};
exports.checkId = function (request, response, next, value) {
  console.log(`Tour 's id is : ${value}`);
  if (request.params.id > tours.length) {
    return response.status(404).json({
      status: 'fail',
      message: 'Invalid Id',
    });
  }
  next();
};
exports.checkBody = function (request, response, next) {
  if (!request.body.name || !request.body.price) {
    return response.status(400).json({
      status: 'fail',
      message: 'Missing name or price',
    });
  }
  next();
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
  response.status(200).json({
    requestedAt: request.requestedTime,
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
};
exports.getTour = function (request, response) {
  const tour = tours[request.params.id];
  response.status(200).json({
    status: 'success',
    result: 1,
    data: {
      tour,
    },
  });
};
