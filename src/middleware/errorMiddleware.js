module.exports = (err, req, res, next) => {
  console.log(err.name);

  if (err.name === "SequelizeValidationError") {
    return res.status(400).json({ message: err.message });
  }
  res.status(err.statusCode || 500).json({ message: err.message });
};
