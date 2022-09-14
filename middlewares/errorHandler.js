module.exports = async (error, request, response, next) => {
  if (error.status === 400 || (error.errors && (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError'))) {
    response.status(400).json({ errors: error.errors });
  } else if (error.status === 401) {
    response.status(401).json({ message: error.message });
  } else if (error.name === 'JsonWebTokenError') {
    response.status(401).json({ message: 'Invalid Token' });
  } else if (error.status === 403) {
    response.status(403).json({ message: error.message });
  } else if (error.status === 404) {
    response.status(404).json({ message: error.message });
  } else {
    response.status(500).json({ error: error });
  }
}
