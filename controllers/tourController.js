const fs = require('fs');
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);
exports.createTour = function (request, response) {
  //  console.log(request.body);
  const newId = tours[tours.ngth - 1].id + 1;
  const newTour = Object.assign({ id: newId }, request.body);
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      response.status(201).json({
        status: 'success',
        result: tours.length,
        data: {
          tours,
        },
      });
    }
  );
};
exports.updateTour = function (request, response) {
  if (request.params.id > tours.length)
    return response.status(404).json({
      status: 'Fail',
      message: 'invalid id',
    });
  response.status(200).json({
    status: 'success',
    data: {
      tour: 'Tour updated',
    },
  });
};
exports.deleteTour = function (request, response) {
  if (request.params.id > tours.length)
    return response.status(404).json({
      status: 'Fail',
      message: 'invalid id',
    });
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
  const { id } = request.params;
  if (id > tours.length)
    return response.status(404).json({
      status: 'fail',
      message: 'invalid id',
    });
  const tour = tours[id];
  response.status(200).json({
    status: 'success',
    result: 1,
    data: {
      tour,
    },
  });
};
