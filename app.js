const express = require('express');
const app = express();
const PORT = 3000;
app.get('/', function (request, response) {
  response
    .status(200)
    .json({ message: 'Hello from the server side', app: 'Natours' });
});
app.post('/Natours', function (request, response) {
  response.send('Hey again ...');
});
app.listen(PORT, function () {
  console.log('App is running on port ' + PORT);
});
