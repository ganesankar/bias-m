import * as Types from '../types';
import { showToast } from './toast';
import axios from 'axios';

import { apiConfig } from '../../services/api';
export const loadArticlesInit = () => ({
  type: Types.LOAD_ARTICLES_INIT,
});

export const loadArticlesError = (error) => (dispatch, getState) => {
  dispatch(showToast({ title: 'Error', text: error }));
  dispatch({ type: Types.LOAD_ARTICLES_ERROR, payload: error });
};

export const loadArticlesSuccess = (data) => ({
  type: Types.LOAD_ARTICLES_SUCCESS,
  payload: data,
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

export const loadArticles = (params, isLoadMoreRequest, callback) => async (
  dispatch,
  getState,
) => {
  dispatch(loadArticlesInit());

  errorHandler(
    async (params, isLoadMoreRequest, callback) => {
      const baseUrl = `${apiConfig.base}${apiConfig.articles.url}`;
      const response = await axios.get(baseUrl);
      dispatch(loadArticlesSuccess(response.data));
      if (callback) callback();
    },
    loadArticlesError,
    dispatch,
  )(params, isLoadMoreRequest, callback);
};
