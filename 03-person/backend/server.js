const express = require('express');
const connectDB = require('./db/connection');
const colors = require('colors');
const route = require('./routes/route');
//connect to database
connectDB();

const app = express();

//body parser
app.use(express.json());

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, PATCH');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );

  next();
});

//Mount routes
app.use('/route', route);

const PORT = 5000;

const server = app.listen(
  PORT,
  console.log(`Server running in DEV mode on Port ${PORT}`.yellow.bold)
);

//handle promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);

  //close server and exit process
  server.close(() => process.exit(1));
});
