const fs = require('fs');
const express = require('express');
const app = express();
const PORT = 3000;
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
  fs.readFileSync(`${__dirname}/dev-data/data/tours.json`)
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
app.listen(PORT, function () {
  console.log('App is running on port ' + PORT);
});
