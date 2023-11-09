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
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
