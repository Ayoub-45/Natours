const fs = require('fs');
const dotenv = require('dotenv');
const tourModel = require('../../models/tourModel');
dotenv.config({ path: '../../config.env' });
const mongoose = require('mongoose');

//Connecting to a remote database
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);
mongoose.connect(DB);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection failed:'));
db.once('open', () => {
  console.log('Connected to database successfully');
});
//Reading data from file system
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8'),
);

// Importing data
const importData = async () => {
  try {
    await tourModel.create(tours);
    console.log('data successfully imported');
    process.exit();
  } catch (err) {
    console.log(err);
  }
};
const deleteData = async () => {
  try {
    await tourModel.deleteMany();
    console.log('data successfully deleted');
    process.exit();
  } catch (err) {
    console.log(err);
  }
};
if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
