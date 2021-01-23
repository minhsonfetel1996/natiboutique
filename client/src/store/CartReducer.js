import {
  ADD_TO_CART_ACTION,
  REMOVE_ITEM_ACTION,
  SET_CART_CLICKED_ACTION,
  SET_CART_ITEMS_ACTION,
} from "./common/Constants";

// public dispatch actions
export const setCartClicked = (isClick = false) => {
  return {
    type: SET_CART_CLICKED_ACTION,
    payload: {
      isClick,
    },
  };
};

export const isExists = (cartItems = [], item = {}) => {
  for (let cartItem of cartItems) {
    if (cartItem._id === item._id) {
      return true;
    }
  }
  return false;
};

export const addToCart = (_id, selectedSize) => {
  return {
    type: ADD_TO_CART_ACTION,
    payload: {
      _id: _id,
      selectedSize: selectedSize,
    },
  };
};

export const removeItem = (_id, isCartClicked) => {
  return {
    type: REMOVE_ITEM_ACTION,
    payload: {
      _id,
      isCartClicked,
    },
  };
};

// public get data from cart store
export const getCartItems = (state) => {
  return state.cartReducer.cart.items;
};

export const getCartItemsSize = (state) => {
  return state.cartReducer.cart.items
    ? state.cartReducer.cart.items.reduce(
        (e1, e2) => e1.quantity + e2.quantity,
        0
      )
    : 0;
};

export const checkIsCartEmpty = (state) =>
  !state.cartReducer.cart.items || state.cartReducer.cart.items.length === 0;

export const getTotalBasket = (state) => {
  return state.cartReducer.cart.totalBasket;
};

export const getIsCartClicked = (state) => {
  return state.cartReducer.isCartClicked;
};

const initializeState = {
  cart: {
    items: null,
    totalBasket: 0,
  },
  isCartClicked: false,
};

// Handlers

const setCartItemsHandler = (state, action) => {
  return {
    ...state,
    cart: {
      items: action.json.data.items || [],
      totalBasket: action.json.data.totalBasket || 0,
    },
    isCartClicked: action.json.isCartClicked,
  };
};

// Reducer
const cartReducer = (state = initializeState, action) => {
  switch (action.type) {
    case SET_CART_CLICKED_ACTION:
      return {
        ...state,
        isCartClicked: action.payload.isClick,
      };
    case SET_CART_ITEMS_ACTION:
      return setCartItemsHandler(state, action);
    default:
      return state;
  }
};

export default cartReducer;
