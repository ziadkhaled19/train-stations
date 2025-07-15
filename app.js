const express = require('express');
const app = express();
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
require('dotenv').config();


const errorHandler = require('./middleware/errorHandler');
const apiError = require('./utils/apiError');

// routes
const authRoutes = require('./routes/authRoutes');
const stationRoutes = require('./routes/stationRoutes');
const userRoutes = require('./routes/userRoutes');
const complaintRoutes = require('./routes/complaintRoutes');


// middleware
app.use(helmet());
app.use(cors({
  origin: '*',
  credentials: true
}));

app.use(morgan('combined'));
app.use(morgan('dev'));

const limiter = rateLimit({
  windowMs: process.env.RATE_LIMIT_WINDOW_MS,  
  max: process.env.RATE_LIMIT_MAX_REQUESTS, 
  message: 'Too many requests from this IP, please try again later.'
});
app.use(limiter);

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));


// routes
app.use('/api/auth', authRoutes);
app.use('/api/stations', stationRoutes);
app.use('/api/users', userRoutes);
app.use('/api/complaints', complaintRoutes);

//  check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Train Station API is running',
    timestamp: new Date().toISOString()
  });
});

//  Not found 
app.use('*', (req, res, next) => {
  next(new apiError('Route not found', 404));
});

// Error handling 
app.use(errorHandler);

module.exports = app;

