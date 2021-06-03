import { put } from "redux-saga/effects";
import { deleteReq, post } from "../../services/HttpService";
import {
  SET_APP_ALERT_ACTION,
  SET_CART_ITEMS_ACTION,
} from "../common/Constants";

export function* addToCart(action) {
  const data = yield post("/cart", {
    ...action.payload,
  })
    .then((res) => {
      if (res.data.success) {
        return res.data;
      } else {
        // TODO handle error message
        return null;
      }
    })
    .catch((error) => {
      console.log("Have error during add product to cart: ", error);
    });
  if (data) {
    yield put({
      type: SET_CART_ITEMS_ACTION,
      json: { ...data },
    });
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

export function* removeItem(action) {
  const data = yield deleteReq(`/cart/product/${action.payload._id}`)
    .then((res) => {
      if (res.data.success) {
        return res.data;
      } else {
        // TODO handle error message
        return null;
      }
    })
    .catch((error) => {
      console.log("Have error during remove product in cart: ", error);
    });
  if (data) {
    yield put({
      type: SET_CART_ITEMS_ACTION,
      json: {
        ...data,
        isCartClicked:
          action.payload.isCartClicked && data.data.items.length > 0,
      },
    });
  }
}
