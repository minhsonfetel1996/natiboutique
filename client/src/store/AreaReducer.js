import {
  GET_CITIES_ACTION,
  GET_DISTRICTS_ACTION,
  RESET_APP_ALERT_ACTION,
  SET_CITIES_ACTION,
  SET_DISTRICTS_ACTION,
} from "./common/Constants";

export const getCitiesAction = () => ({
  type: GET_CITIES_ACTION,
});

export const getDistrictsAction = (cityId) => ({
  type: GET_DISTRICTS_ACTION,
  payload: {
    cityId,
  },
});

export const resetDistrictsAction = () => ({
  type: RESET_APP_ALERT_ACTION,
});

// MARK: SELECTORS
export const getCitiesFromState = (state) => {
  return state.areaReducer.cities;
};

export const getDistrictsFromState = (state) => {
  return state.areaReducer.districts;
};

const initializeState = {
  cities: [],
  districts: [],
};

// Reducer
const areaReducer = (state = initializeState, action) => {
  switch (action.type) {
    case SET_CITIES_ACTION:
      return {
        ...state,
        cities: action.json,
      };
    case SET_DISTRICTS_ACTION:
      return {
        ...state,
        districts: action.json,
      };
    case RESET_APP_ALERT_ACTION: {
      return {
        ...state,
        districts: [],
      };
    }
    default:
      return state;
  }
};

export default areaReducer;
