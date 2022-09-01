class UnauthorizedError extends Error {
  statusCode = 401;
  name = 'UnauthorizedError';
}

export default UnauthorizedError;
