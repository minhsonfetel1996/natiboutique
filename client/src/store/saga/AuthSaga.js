import { put } from "redux-saga/effects";
import { get, post } from "../../services/HttpService";
import {
  REMOVE_USER_ACTION,
  SET_APP_ALERT_ACTION,
  SET_CART_ITEMS_ACTION,
  SET_LANG_ID_ACTION,
  SET_READY_APP_ACTION,
  SET_USER_ACTION,
} from "../common/Constants";

export function* getCurrentUser() {
  const data = yield get("/auth/keep-alive")
    .then((res) => res.data)
    .catch((error) => {
      console.log("Have error in fetch user profile: ", error);
    });
  if (data.success) {
    yield put({ type: SET_USER_ACTION, json: data.data.user });
    yield put({
      type: SET_CART_ITEMS_ACTION,
      json: { data: { ...data.data.user.cart }, isCartClicked: false },
    });
    yield put({
      type: SET_LANG_ID_ACTION,
      payload: { langId: data.data.user.currentLang },
    });
    yield put({
      type: SET_READY_APP_ACTION,
      payload: { ready: true },
    });
  } else {
    yield put({
      type: SET_APP_ALERT_ACTION,
      payload: {
        isAlertOpen: true,
        success: data.success,
        message: data.message,
      },
    });
  }
}

export function* updateCurrentLanguage(action) {
  const data = yield post("/auth/language/" + action.payload.langId)
    .then((res) => res.data)
    .catch((error) => {
      console.log("Have error in fetch user profile: ", error);
    });
  if (data.success) {
    yield put({ type: SET_USER_ACTION, json: data.data.user });
    yield put({
      type: SET_LANG_ID_ACTION,
      payload: { langId: data.data.user.currentLang },
    });
  } else {
    yield put({
      type: SET_APP_ALERT_ACTION,
      payload: {
        isAlertOpen: true,
        success: data.success,
        message: data.message,
      },
    });
  }
}

export function* logout() {
  const data = yield post("/auth/logout", null)
    .then((res) => res.data)
    .catch((error) => {
      console.log("Have error in logout user: ", error);
    });
  if (data.success) {
    yield put({ type: REMOVE_USER_ACTION });
  }
  yield put({
    type: SET_APP_ALERT_ACTION,
    payload: {
      isAlertOpen: true,
      success: data.success,
      message: data.message,
    },
  });
}
