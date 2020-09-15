import * as Types from '../types';
import { showToast } from './toast';
import axios from 'axios';

import { apiConfig } from '../../services/api';
export const loadSemestersInit = () => ({
  type: Types.LOAD_SEMESTERS_INIT,
});

export const loadSemestersError = (error) => (dispatch, getState) => {
  dispatch(showToast({ title: 'Error', text: error }));
  dispatch({ type: Types.LOAD_SEMESTERS_ERROR, payload: error });
};

export const loadSemestersSuccess = (data) => ({
  type: Types.LOAD_SEMESTERS_SUCCESS,
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

export const loadSemesters = (params, isLoadMoreRequest, callback) => async (
  dispatch,
  getState,
) => {
  dispatch(loadSemestersInit());

  errorHandler(
    async (params, isLoadMoreRequest, callback) => {
      const baseUrl = `${apiConfig.base}${apiConfig.semesters.url}`;
      const response = await axios.get(baseUrl);
      dispatch(loadSemestersSuccess(response.data));
      if (callback) callback();
    },
    loadSemestersError,
    dispatch,
  )(params, isLoadMoreRequest, callback);
};
