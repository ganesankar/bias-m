import * as Types from '../types';
import axios from 'axios';

import { showToast } from './toast';
import { apiConfig } from '../../services/api';

export const loadArticleInit = () => ({
  type: Types.LOAD_ARTICLE_INIT,
});

export const loadArticleError = (error) => (dispatch) => {
  dispatch({ type: Types.LOAD_ARTICLE_ERROR, payload: error });
  dispatch(showToast({ title: 'Error', text: error }));
};

export const loadArticleSuccess = (article) => ({
  type: Types.LOAD_ARTICLE_SUCCESS,
  payload: article,
});

const errorHandler = (successfn, errorAction, dispatch) => {
  return async (...args) => {
    try {
      await successfn(...args);
    } catch (error) {
      if (error.message) {
        dispatch(errorAction(error.message));
      }
    }
  };
};

export const loadArticle = (id, callback) => async (dispatch, getState) => {
  dispatch(loadArticleInit());

  errorHandler(
    async (id, callback) => {
      const baseUrl = `${apiConfig.base}${apiConfig.article.url}`;

      const response = await axios.get(`${baseUrl}/${id}`);
      const page = response.data;
      dispatch(loadArticleSuccess(page));

      if (callback) callback();
    },
    loadArticleError,
    dispatch,
  )(id, callback);
};
