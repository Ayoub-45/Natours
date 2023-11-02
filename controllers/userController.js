const fs = require('fs');
const users = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/users.json`)
);
exports.getAllUsers = function (request, response) {
  response.status(200).json({
    results: 'success',
    data: {
      users,
    },
  });
};
exports.getUser = function (request, response) {
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
exports.createUser = function (request, response) {
  response.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
};
exports.updateUser = function (request, response) {
  response.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
};
exports.deleteUser = function (request, response) {
  response.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
};
