import {
  FETCH_USER_ACTION,
  LOGOUT_ACTION,
  REMOVE_USER_ACTION,
  SET_CHECKOUT_CLICKED_ACTION,
  SET_USER_ACTION,
} from "./common/Constants";

export const fetchUserProfile = () => ({
  type: FETCH_USER_ACTION,
});

export const logout = () => ({
  type: LOGOUT_ACTION,
});

export const setUserAction = (user) => {
  return {
    type: SET_USER_ACTION,
    json: user,
  };
};

export const removeUserProfile = () => {
  return {
    type: REMOVE_USER_ACTION,
  };
};

export const setCheckoutClick = (isCheckoutClick) => {
  return {
    type: SET_CHECKOUT_CLICKED_ACTION,
    payload: {
      isCheckoutClick,
    },
  };
};

// MARK: SELECTORS
export const getCurrentUser = (state) => {
  return state.authReducer.user;
};

export const isLoggedInUser = (state) => {
  return state.authReducer.user && state.authReducer.user._id;
};

export const isCheckoutClick = (state) => {
  return state.authReducer.isCheckoutClick;
};

export const isLoading = (state) => {
  return state.authReducer.loading;
};

const initializeState = {
  user: undefined,
  isCheckoutClick: false,
  loading: true,
};

// Reducer
const authReducer = (state = initializeState, action) => {
  switch (action.type) {
    case SET_USER_ACTION:
      return {
        ...state,
        user: action.json,
      };
    case REMOVE_USER_ACTION:
      return { ...state, user: null, isCheckoutClick: false };
    case SET_CHECKOUT_CLICKED_ACTION:
      return {
        ...state,
        isCheckoutClick: action.payload.isCheckoutClick,
      };
    default:
      return state;
  }
};

export default authReducer;
