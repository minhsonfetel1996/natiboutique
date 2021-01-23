/**
 * @author spm
 */
const { sign, verify } = require("jsonwebtoken");
const {
  NODE_ENV,
  COOKIE_ACCESS_TOKEN_EXPIRATION_MS,
  COOKIE_REFRESH_TOKEN_EXPIRATION_MS,
  COOKIE_ACCESS_TOKEN,
  COOKIE_REFRESH_TOKEN,
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
} = process.env;

const verifyToken = (req, res, next) => {
  verifyTokenByNameAndSecretKey(
    req,
    res,
    next,
    COOKIE_ACCESS_TOKEN,
    ACCESS_TOKEN_SECRET
  );
};

const verifyTokenByNameAndSecretKey = (
  req,
  res,
  next,
  cookieTokenName,
  secret
) => {
  const token = req.cookies[cookieTokenName];
  if (!token) {
    return res
      .status(401)
      .json({ status: 401, message: "Access Denied. No token provided" });
  } else {
    const decoded = verify(token, secret);
    if (decoded) {
      next();
    } else {
      res.status(500).json({ message: "Have internal error" });
    }
  }
};

const sendToken = (res, key, token, expirationMs) => {
  res.cookie(key, token, {
    httpOnly: NODE_ENV === "development",
    secure: NODE_ENV === "production" || NODE_ENV === "staging",
    expires: new Date(Date.now() + parseInt(expirationMs, 10)),
    maxAge: parseInt(expirationMs, 10),
    sameSite:
      NODE_ENV === "production" || NODE_ENV === "staging" ? "none" : undefined,
  });
};

// ACCESS TOKEN
const sendSimpleUserAccessToken = (res, token) => {
  sendToken(res, COOKIE_ACCESS_TOKEN, token, COOKIE_ACCESS_TOKEN_EXPIRATION_MS);
};

// REFRESH TOKEN
const sendSimpleUserRefreshToken = (res, token) => {
  sendToken(
    res,
    COOKIE_REFRESH_TOKEN,
    token,
    COOKIE_REFRESH_TOKEN_EXPIRATION_MS
  );
};

const getSimpleUserFromJWT = (req, key, secretKey) => {
  const token = req.cookies[key];
  if (!token) {
    return null;
  }
  return verify(token, secretKey);
};

const getSimpleUserFromAccessToken = (req) => {
  return getSimpleUserFromJWT(req, COOKIE_ACCESS_TOKEN, ACCESS_TOKEN_SECRET);
};

const getSimpleUserFromRefreshToken = (req) => {
  return getSimpleUserFromJWT(req, COOKIE_REFRESH_TOKEN, REFRESH_TOKEN_SECRET);
};

const generateToken = (payload, tokenSecret) => {
  return sign(preparePayloadForSign(payload), tokenSecret);
};

const generateAccessToken = (payload) => {
  return generateToken(payload, ACCESS_TOKEN_SECRET);
};

const generateRefreshToken = (payload) => {
  return generateToken(payload, REFRESH_TOKEN_SECRET);
};

const preparePayloadForSign = (payload) => {
  return {
    _id: payload ? payload._id : null,
    username: payload ? payload.username : "anonymous",
    firstName: payload ? payload.firstName : null,
    lastName: payload ? payload.lastName : null,
    role: payload ? payload.role : null,
    cart: payload
      ? { ...payload.cart }
      : {
          items: [],
          totalBasket: 0,
        }, // selected product ids
    currentLang: payload ? payload.currentLang : "vn",     
  };
};

module.exports = {
  verifyToken,
  verifyTokenByNameAndSecretKey,
  sendSimpleUserAccessToken,
  sendSimpleUserRefreshToken,
  getSimpleUserFromAccessToken,
  getSimpleUserFromRefreshToken,
  generateAccessToken,
  generateRefreshToken,
  preparePayloadForSign,
};
