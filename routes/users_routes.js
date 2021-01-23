/**
 * @author spm
 */
const express = require("express");
const UsersRouter = express.Router();
const {
  verifyToken,
  getSimpleUserFromAccessToken,
  sendSimpleUserAccessToken,
  generateAccessToken,
  generateRefreshToken,
  preparePayloadForSign,
  sendSimpleUserRefreshToken,
  getSimpleUserFromRefreshToken,
} = require("../modules/jwt/jwt_service");

const {
  failureResponse,
  successResponse,
  badRequest,
} = require("./common/response_templates");

const UsersService = require("../modules/users/users_service");
const { validationResult } = require("express-validator");
const SUPPORTED_LANG = ["vn", "en"];

const validateAccount = (req, res) => {
  const errors = validationResult(req);
  if (errors && errors.array().length > 0) {
    return failureResponse(null, errors.array(), res);
  }
};

const processAuthentication = (user, res, message) => {
  const payload = preparePayloadForSign(user);
  sendSimpleUserAccessToken(res, generateAccessToken(payload));
  sendSimpleUserRefreshToken(res, generateRefreshToken(payload));
  return successResponse(
    message,
    {
      user: payload,
    },
    res
  );
};

const getApplicationContext = (req, res) => {
  return processAuthentication(
    getSimpleUserFromAccessToken(req) || getSimpleUserFromRefreshToken(req),
    res,
    "Get application context successfully"
  );
};

const login = (req, res) => {
  const user = getSimpleUserFromAccessToken(req);
  if (user && user._id) {
    return badRequest(res, "You must log out before login");
  }
  validateAccount(req, res);
  const { username, password } = req.body;
  try {
    UsersService.login(username, password)
      .then((user) => {
        return user
          ? processAuthentication(user, res, "Login successfully.")
          : badRequest(res, "The username or password is invalid.");
      })
      .catch((error) => {
        return badRequest(res, error);
      });
  } catch (error) {
    console.log("Have internal error: " + error);
    return res.status(500).json({
      message: "Have internal error",
    });
  }
};

const register = (req, res) => {
  try {
    const user = getSimpleUserFromAccessToken(req);
    if (user && user._id) {
      return badRequest(res, "You must log out before login");
    }
    validateAccount(req, res);
    UsersService.register(req.body)
      .then((user) => {
        return processAuthentication(user, res, "Register successfully.");
      })
      .catch((error) => {
        return badRequest(res, error);
      });
  } catch (error) {
    console.log("Have internal error: " + error);
    return res.status(500).json({
      message: "Have internal error",
    });
  }
};

const logout = (req, res) => {
  try {
    let user = getSimpleUserFromAccessToken(req);
    if (user && !user._id) {
      return badRequest(res, "You must login before log out.");
    } else {
      UsersService.logout(user._id)
        .then((user) => {
          if (user) {
            res.clearCookie(process.env.COOKIE_ACCESS_TOKEN, { path: "/" });
            res.clearCookie(process.env.COOKIE_REFRESH_TOKEN, { path: "/" });
            return successResponse("Logout successfully.", {}, res);
          } else {
            res.clearCookie(process.env.COOKIE_ACCESS_TOKEN, { path: "/" });
            res.clearCookie(process.env.COOKIE_REFRESH_TOKEN, { path: "/" });
            return badRequest("Logout unsuccessfully.", {}, res);
          }
        })
        .catch((error) => {
          console.log(error);
          return badRequest(res, error);
        });
    }
  } catch (error) {
    console.log("Have internal error: " + error);
    return res.status(500).json({
      message: "Have internal error",
    });
  }
};

const updateCurrentLanguage = (req, res) => {
  const selectedLang = req.params.selectedLang;
  if (
    !selectedLang ||
    selectedLang.length === 0 ||
    SUPPORTED_LANG.filter((lang) => lang === selectedLang).length === 0
  ) {
    return badRequest(res, "Invalid language");
  }
  let payload = getSimpleUserFromAccessToken(req);
  console.log("SELECTED_LANG: " + selectedLang);
  payload.currentLang = selectedLang;
  return processAuthentication(payload, res, "Updated");
};

UsersRouter.get("/keep-alive", getApplicationContext);
UsersRouter.post("/login", login);
UsersRouter.post("/register", register);
UsersRouter.post("/logout", verifyToken, logout);
UsersRouter.post("/language/:selectedLang", verifyToken, updateCurrentLanguage);

module.exports = UsersRouter;
