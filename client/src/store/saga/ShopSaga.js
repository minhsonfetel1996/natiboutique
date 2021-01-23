import { put } from "redux-saga/effects";
import { get } from '../../services/HttpService';
import { SET_CITIES_ACTION, SET_DISTRICTS_ACTION } from "../common/Constants";

export function* getCities() {
    const data = yield get('/shop/cities')
        .then((res) => res.data.data)
        .catch((error) => {
            console.log("Have error in fetch user profile: ", error);
        });
    yield put({ type: SET_CITIES_ACTION, json: data || [] });
}

export function* getDistricts(action) {
    const data = yield get('/shop/' + action.payload.cityId + '/districts')
        .then((res) => res.data.data)
        .catch((error) => {
            console.log("Have error in logout user: ", error);
        });
    yield put({ type: SET_DISTRICTS_ACTION, json: data || [] });
}
