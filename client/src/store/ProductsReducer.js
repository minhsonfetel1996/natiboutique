import queryString from "query-string";
import {
  GET_PRODUCTS_ACTION,
  GET_PRODUCT_ACTION,
  ON_LOAD_MORE_BTN_CLICK_ACTION,
  SET_CATEGORY_ACTION,
  SET_KEYWORD_ACTION,
  SET_PRODUCTS_ACTION,
  SET_SELECTED_SIZE_ACTION,
} from "./common/Constants";

// public dispatch action
export const getProductsAction = (filters) => ({
  type: GET_PRODUCTS_ACTION,
  payload: {
    filters,
  },
});

export const setCategory = (category = "") => {
  return {
    type: SET_CATEGORY_ACTION,
    payload: {
      category,
    },
  };
};

export const setKeyWord = (keyword = "") => {
  return {
    type: SET_KEYWORD_ACTION,
    payload: {
      keyword,
    },
  };
};

export const getProductAction = (id) => ({
  type: GET_PRODUCT_ACTION,
  payload: {
    id,
  },
});

export const onLoadMoreBtnClick = () => {
  return {
    type: ON_LOAD_MORE_BTN_CLICK_ACTION,
  };
};

export const setSelectedSizeAction = (selectedSize) => {
  return {
    type: SET_SELECTED_SIZE_ACTION,
    payload: {
      selectedSize,
    },
  };
};

// public get state
export const getFilters = (state) => {
  return state.productsReducer.filters;
};

export const getProducts = (state) => {
  return state.productsReducer.products;
};

export const getIsLoading = (state) => {
  return state.productsReducer.isLoading;
};

export const getIsLoadMore = (state) => {
  return state.productsReducer.isLoadMore;
};

export const getHasMore = (state) => {
  return state.productsReducer.hasMore;
};

export const getSelectedSize = (state) => {
  return state.productsReducer.selectedSize;
};

export const getTotalProducts = (state) => {
  return state.productsReducer.total;
};

const initializeState = {
  products: null,
  isLoading: false,
  isLoadMore: true,
  hasMore: false,
  total: 0,
  filters: {
    ...(queryString.parseUrl(window.location.href).query || {}),
    limit: 12,
    skip: 0,
  },
  selectedSize: null,
};

const setProductsHandler = (state, action) => {
  return {
    ...state,
    products: [...(state.products || []), ...action.json.data.data],
    isLoading: false,
    hasMore: action.json.data.meta.hasMore,
    total: action.json.data.meta.total,
  };
};

const setCategoryHandler = (state, action) => {
  const { filters } = state;
  return {
    ...state,
    filters: {
      ...filters,
      limit: 15,
      skip: 0,
      _category: action.payload.category,
    },
    isLoading: true,
  };
};

const setKeyWordHandler = (state, action) => {
  return {
    ...state,
    filters: {
      ...state.filters,
      _category: null,
      _keyword: action.payload.keyword,
    },
    isLoading: true,
  };
};

const onLoadMoreBtnClickHandler = (state) => {
  return {
    ...state,
    filters: {
      ...state.filters,
      skip: state.filters.skip + state.filters.limit,
    },
    isLoadMore: true,
    isLoading: true,
  };
};

// Reducer
const productsReducer = (state = initializeState, action) => {
  switch (action.type) {
    case SET_PRODUCTS_ACTION:
      return setProductsHandler(state, action);
    case SET_CATEGORY_ACTION:
      return setCategoryHandler(state, action);
    case SET_KEYWORD_ACTION:
      return setKeyWordHandler(state, action);
    case ON_LOAD_MORE_BTN_CLICK_ACTION:
      return onLoadMoreBtnClickHandler(state);
    case SET_SELECTED_SIZE_ACTION:
      return {
        ...state,
        selectedSize: action.payload.selectedSize,
      };
    default:
      return state;
  }
};

export default productsReducer;
