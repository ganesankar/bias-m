import * as Types from '../types';
import { showToast } from './toast';
import axios from 'axios';

import { apiConfig } from '../../services/api';
export const loadArticlesInit = () => ({
  type: Types.LOAD_SESSIONS_INIT,
});

export const loadSessionsError = (error) => (dispatch, getState) => {
  dispatch(showToast({ title: 'Error', text: error }));
  dispatch({ type: Types.LOAD_SESSIONS_ERROR, payload: error });
};

export const loadSessionsSuccess = (data) => ({
  type: Types.LOAD_SESSIONS_SUCCESS,
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

export const loadSessions = (params, isLoadMoreRequest, callback) => async (
  dispatch,
  getState,
) => {
  dispatch(loadSessionsInit());

  errorHandler(
    async (params, isLoadMoreRequest, callback) => {
      const baseUrl = `${apiConfig.base}${apiConfig.sessions.url}`;
      const response = await axios.get(baseUrl);
      dispatch(loadSessionsSuccess(response.data));
      if (callback) callback();
    },
    loadArticlesError,
    dispatch,
  )(params, isLoadMoreRequest, callback);
};
