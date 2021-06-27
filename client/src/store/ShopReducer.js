import {
  RESET_APP_ALERT_ACTION,
  SET_APP_ALERT_ACTION,
  SET_LANG_ID_ACTION,
  SET_READY_APP_ACTION,
  UPDATE_LANG_ID_ACTION,
} from "./common/Constants";

export const setAppAlertAction = (payload) => ({
  type: SET_APP_ALERT_ACTION,
  payload: {
    ...payload,
  },
});

export const resetAppAlertAction = () => ({
  type: RESET_APP_ALERT_ACTION,
});

export const setLangIdAction = (langId) => ({
  type: SET_LANG_ID_ACTION,
  payload: {
    langId,
  },
});

export const updateLangIdAction = (langId) => ({
  type: UPDATE_LANG_ID_ACTION,
  payload: {
    langId,
  },
});

// MARK: SELECTORS
export const getAlertInfoFromState = (state) => state.shopReducer.alert;
export const getLangIdFromState = (state) => state.shopReducer.langId;
export const isAppReady = (state) => state.shopReducer.ready;

const initializeState = {
  ready: false,
  langId: null,
  alert: {
    isAlertOpen: false,
    success: false,
    message: null,
  },
};

// Reducer
const shopReducer = (state = initializeState, action) => {
  switch (action.type) {
    case SET_APP_ALERT_ACTION:
      return {
        ...state,
        alert: {
          ...action.payload,
        },
      };
    case RESET_APP_ALERT_ACTION:
      return {
        ...state,
        alert: {
          isAlertOpen: false,
          success: false,
          message: null,
        },
      };
    case SET_LANG_ID_ACTION:
      return {
        ...state,
        langId: action.payload.langId || "vn",
      };
    case SET_READY_APP_ACTION:
      return {
        ...state,
        ready: action.payload.ready,
      };
    default:
      return state;
  }
};

export default shopReducer;
