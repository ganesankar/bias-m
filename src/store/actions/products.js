import * as Types from '../types';
import { showToast } from './toast';
import axios from 'axios';

export const loadProductsInit = (isLoadMoreRequest) => ({
  type: isLoadMoreRequest
    ? Types.LOAD_MORE_PRODUCTS_INIT
    : Types.LOAD_PRODUCTS_INIT,
});

export const loadProductsError = (isLoadMoreRequest, error) => (
  dispatch,
  getState,
) => {
  dispatch(showToast({ title: 'Error', text: error }));
  dispatch({
    type: isLoadMoreRequest
      ? Types.LOAD_MORE_PRODUCTS_ERROR
      : Types.LOAD_PRODUCTS_ERROR,
    payload: error,
  });
};

export const loadProductsSuccess = (isLoadMoreRequest, products) => ({
  type: isLoadMoreRequest
    ? Types.LOAD_MORE_PRODUCTS_SUCCESS
    : Types.LOAD_PRODUCTS_SUCCESS,
  payload: products,
});

const errorHandler = (successfn, errorAction, dispatch) => {
  return async (...args) => {
    try {
      await successfn(...args);
    } catch (error) {
      if (error.message) {
        dispatch(errorAction(args[1], error.message));
      }
    }
  };
};

export const loadProducts = (params, isLoadMoreRequest, callback) => async (
  dispatch,
  getState,
) => {
  dispatch(loadProductsInit(isLoadMoreRequest));

  errorHandler(
    async (params, isLoadMoreRequest, callback) => {
      const baseUrl =
        'https://revit8apps.netlify.app/.netlify/functions/students-read-all';
      const response = await axios.get(baseUrl);
      const products = response.data;

      const productsWithAdverts = products;
      dispatch(loadProductsSuccess(isLoadMoreRequest, productsWithAdverts));
      if (callback) callback();
    },
    loadProductsError,
    dispatch,
  )(params, isLoadMoreRequest, callback);
};

//snackbars, errors handling, css cards hoover

// Error handler for async / await functions

/*
const catchErrors = fn => {
  return function(req, res, next) {
    return fn(req, res, next).catch(next);
  };
};
*/
