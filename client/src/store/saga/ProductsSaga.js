import queryString from "query-string";
import { put } from "redux-saga/effects";
import { get } from "../../services/HttpService";
import { SET_PRODUCTS_ACTION } from "../common/Constants";

export function* getProducts(action) {
  const paramsString = queryString.stringify(action.payload.filters);
  const data = yield get(`/products?${paramsString}`)
    .then((res) => res.data)
    .catch((error) => {
      console.log("Have error during get products: ", error);
    });
  yield put({ type: SET_PRODUCTS_ACTION, json: data });
}
