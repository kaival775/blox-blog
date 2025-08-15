const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const dotenv = require('dotenv');
dotenv.config();

const { authRoute, categoryRoute, fileRoute, postRoute } = require('./routes');
const connectMongo = require('./init/mongodb');
const { errorHandler } = require('./middlewares')
const notFound = require('./controllers/notFound');

//init app
const app = express();

// database connection
connectMongo();

// 3rd party middlware
app.use(express.json({limit: '500mb'}));
app.use(bodyParser.urlencoded({ extended: true, limit: '500mb' }));
app.use(morgan("dev"));

// CORS middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

//routes section
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/category", categoryRoute);
app.use("/api/v1/file", fileRoute);
app.use("/api/v1/posts", postRoute);

app.use((req, res) => {
  notFound(req, res);
});


//error handling middleware
app.use(errorHandler);

module.exports = app;