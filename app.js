const fs = require('fs');
const express = require('express');
const app = express();
const PORT = 3000;
app.use(express.json());

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);
const getAllTours = function (request, response) {
  response.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
};
const getTour = function (request, response) {
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
const createTour = function (request, response) {
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
const updateTour = function (request, response) {
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
const deleteTour = function (request, response) {
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

app.route('/api/v1/tours').get(getAllTours).post(createTour);
app
  .route('/api/v1/tours/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);
app.listen(PORT, function () {
  console.log('App is running on port ' + PORT);
});
