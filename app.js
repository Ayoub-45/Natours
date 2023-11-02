const fs = require('fs');
const express = require('express');
const app = express();
const morgan = require('morgan');
const PORT = 3000;
app.use(express.json());
app.use(morgan('dev'));
app.use(function (request, response, next) {
  request.requestedTime = new Date().toISOString();
  next();
});
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);
const users = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/users.json`)
);
const getAllTours = function (request, response) {
  response.status(200).json({
    requestedAt: request.requestedTime,
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
const tourRouter = express.Router();

tourRouter.route('/').get(getAllTours).post(createTour);

tourRouter.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

const getAllUsers = function (request, response) {
  response.status(200).json({
    results: 'success',
    data: {
      users,
    },
  });
};
const getUser = function (request, response) {
  const { id } = request.params;
  const idIsExist = users.find((user) => id === user);
  if (!idIsExist)
    return response.status(404).json({
      status: 'Fail',
      message: 'User not found',
    });
  else {
    const user = users[id];
    response.status(200).json({
      status: 'success',
      data: user,
    });
  }
};
const createUser = function (request, response) {
  response.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
};
const updateUser = function (request, response) {
  response.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
};
const deleteUser = function (request, response) {
  response.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
};
const userRouter = express.Router();
userRouter.route('/').get(getAllUsers).post(createUser);
userRouter.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/tours', tourRouter);
app.listen(PORT, function () {
  console.log('App is running on port ' + PORT);
});
