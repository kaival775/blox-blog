const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
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

// CORS configuration
const corsOptions = {
  origin: [
    'http://localhost:5173',
    'https://blox-blog-app.vercel.app'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization']
};

app.use(cors(corsOptions));

// Health check endpoint
app.get('/api/v1/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'Backend is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
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