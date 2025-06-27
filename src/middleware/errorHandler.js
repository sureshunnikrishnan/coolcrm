const config = require('../config');

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  console.error(err); // Log the error for debugging purposes

  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';

  // Handle Prisma-specific errors
  if (err.code) { // Prisma errors often have a 'code' property
    switch (err.code) {
      case 'P2002': // Unique constraint failed
        statusCode = 409; // Conflict
        // Example: "Unique constraint failed on the fields: (`email`)"
        // We can make this more user-friendly
        if (err.meta && err.meta.target && err.meta.target.length > 0) {
          message = `The value for '${err.meta.target[0]}' already exists. Please use a different value.`;
        } else {
          message = 'A record with this value already exists.';
        }
        break;
      case 'P2025': // Record to update not found
        statusCode = 404;
        message = err.meta && err.meta.cause ? err.meta.cause : 'Resource not found.';
        break;
      // Add more Prisma error codes as needed
      default:
        // For other Prisma errors, use a generic message or inspect further
        message = 'A database error occurred.';
    }
  }

  // For development, send detailed error
  if (config.nodeEnv === 'development') {
    return res.status(statusCode).json({
      status: 'error',
      statusCode,
      message,
      stack: err.stack,
      error: err // Include the original error object for more details
    });
  }

  // For production, send a generic message for 500 errors
  if (statusCode === 500) {
    message = 'An unexpected error occurred on the server. Please try again later.';
  }

  res.status(statusCode).json({
    status: 'error',
    statusCode,
    message,
  });
};

module.exports = errorHandler;
