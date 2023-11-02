const fs = require('fs');
const express = require('express');
const app = express();
const PORT = 3000;
app.use(express.json());
/*
app.get('/', function (request, response) {
  response
    .status(200)
    .json({ message: 'Hello from the server side', app: 'Natours' });
});
app.post('/Natours', function (request, response) {
  response.send('Hey again ...');
});
*/
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);
app.get('/api/v1/tours', function (request, response) {
  response.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
});
app.get('/api/v1/tours/:id', function (request, response) {
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
});

app.post('/api/v1/tours', function (request, response) {
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
});
app.patch('/api/v1/tours/:id', function (request, response) {
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
});

app.listen(PORT, function () {
  console.log('App is running on port ' + PORT);
});
