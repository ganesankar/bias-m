import * as Types from '../types';
import axios from 'axios';

import { showToast } from './toast';
import { apiConfig } from '../../services/api';

export const loadPageInit = () => ({
  type: Types.LOAD_PAGE_INIT,
});

export const loadPageError = (error) => (dispatch) => {
  dispatch({ type: Types.LOAD_PAGE_ERROR, payload: error });
  dispatch(showToast({ title: 'Error', text: error }));
};

export const loadPageSuccess = (page) => ({
  type: Types.LOAD_PAGE_SUCCESS,
  payload: page,
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

export const loadPage = (id, callback) => async (dispatch, getState) => {
  dispatch(loadPageInit());

  errorHandler(
    async (id, callback) => {
      const baseUrl = `${apiConfig.base}${apiConfig.page.url}`;
      const uid = apiConfig.page.pages[id];
      const response = await axios.get(`${baseUrl}/${uid}`);
      const page = response.data;
      dispatch(loadPageSuccess(page));

      if (callback) callback();
    },
    loadPageError,
    dispatch,
  )(id, callback);
};
