class BadRequestError extends Error {
  statusCode = 400;
  name = 'BadRequestError';
}

export default BadRequestError;
