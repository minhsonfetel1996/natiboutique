import { all, takeLatest } from "redux-saga/effects";
import {
  ADD_TO_CART_ACTION,
  FETCH_USER_ACTION,
  GET_CITIES_ACTION,
  GET_DISTRICTS_ACTION,
  GET_PRODUCTS_ACTION,
  LOGOUT_ACTION,
  REMOVE_ITEM_ACTION,
  UPDATE_LANG_ID_ACTION,
} from "../common/Constants";
import { getCurrentUser, logout, updateCurrentLanguage } from "./AuthSaga";
import { addToCart, removeItem } from "./CartSaga";
import { getProducts } from "./ProductsSaga";
import { getCities, getDistricts } from "./ShopSaga";

function* actionWatcher() {
  yield takeLatest(FETCH_USER_ACTION, getCurrentUser);
  yield takeLatest(LOGOUT_ACTION, logout);
  yield takeLatest(GET_PRODUCTS_ACTION, getProducts);
  yield takeLatest(GET_CITIES_ACTION, getCities);
  yield takeLatest(GET_DISTRICTS_ACTION, getDistricts);
  yield takeLatest(ADD_TO_CART_ACTION, addToCart);
  yield takeLatest(REMOVE_ITEM_ACTION, removeItem);
  yield takeLatest(UPDATE_LANG_ID_ACTION, updateCurrentLanguage);
}

export default function* rootSaga() {
  yield all([actionWatcher()]);
}
