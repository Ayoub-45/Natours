const mongoose = require('mongoose');
//Creating a Schema for our model, to describe the data and also validate it
const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name'],
    unique: true,
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
module.exports = Tour;
