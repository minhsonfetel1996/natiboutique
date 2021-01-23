function successResponse(message, data, res) {
  return res.status(200).json({
    success: true,
    message: message,
    data: data,
  });
}

function failureResponse(message, data, res) {
  return res.status(200).json({
    success: false,
    message: message,
    data: data,
  });
}

function badRequest(res, message) {
  return res.status(400).json({
    success: false,
    message: message,
    data: {},
  });
}

function mongoError(err, res) {
  return res.status(500).json({
    success: false,
    message: "MongoDB error",
    data: err,
  });
}

module.exports = {
  successResponse,
  failureResponse,
  badRequest,
  mongoError,
};
