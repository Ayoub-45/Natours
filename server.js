const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config({ path: `${__dirname}/config.env` });

const app = require('./app');

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
//Creating a Schema for our model, to describe the data and also validate it
const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name'],
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price'],
  },
});
//Creating our model, the first letter has to be in uppercase
const Tour = mongoose.model('Tour', tourSchema);
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
