const ApiError = require('../utils/apiError');

const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;
  console.error(err);

  if (err.name === 'CastError') {
    const message = 'Resource not found';
    error = new ApiError(message, 404);
  }

  if (err.code === 11000) {
    let message = 'Duplicate field value entered';
    
    const field = Object.keys(err.keyValue)[0];
    const value = err.keyValue[field];
    
    if (field === 'email') {
      message = `Email ${value} is already registered`;
    } else {
      message = `${field.charAt(0).toUpperCase() + field.slice(1)} '${value}' already exists`;
    }
    
    error = new ApiError(message, 400);
  }

  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(val => val.message).join(', ');
    error = new ApiError(message, 400);
  }

  if (err.name === 'JsonWebTokenError') {
    const message = 'Invalid token';
    error = new ApiError(message, 401);
  }

  if (err.name === 'TokenExpiredError') {
    const message = 'Token expired';
    error = new ApiError(message, 401);
  }

  if (err.name === 'MongoNetworkError') {
    const message = 'Database connection error';
    error = new ApiError(message, 500);
  }

  if (err.status === 429) {
    const message = 'Too many requests, please try again later';
    error = new ApiError(message, 429);
  }

  if (err.code === 'EAUTH' || err.code === 'ECONNECTION') {
    const message = 'Email service temporarily unavailable';
    error = new ApiError(message, 503);
  }

  const statusCode = error.statusCode || 500;
  const message = error.message || 'Server Error';

  res.status(statusCode).json({
    status: 'fail',
    error: message,
    ...(process.env.NODE_ENV !== 'production' && { 
      stack: err.stack
    })
  });
};

module.exports = errorHandler;

