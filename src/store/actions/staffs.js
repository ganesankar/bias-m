import * as Types from '../types';
import { showToast } from './toast';
import axios from 'axios';

import { apiConfig } from '../../services/api';
export const loadStaffsInit = () => ({
  type: Types.LOAD_STAFFS_INIT,
});

export const loadStaffsError = (error) => (dispatch, getState) => {
  dispatch(showToast({ title: 'Error', text: error }));
  dispatch({ type: Types.LOAD_STAFFS_ERROR, payload: error });
};

export const loadStaffsSuccess = (data) => ({
  type: Types.LOAD_STAFFS_SUCCESS,
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

export const loadStaffs = (params, isLoadMoreRequest, callback) => async (
  dispatch,
  getState,
) => {
  dispatch(loadStaffsInit());

  errorHandler(
    async (params, isLoadMoreRequest, callback) => {
      const baseUrl = `${apiConfig.base}${apiConfig.staffs.url}`;
      const response = await axios.get(baseUrl);
      dispatch(loadStaffsSuccess(response.data));
      if (callback) callback();
    },
    loadStaffsError,
    dispatch,
  )(params, isLoadMoreRequest, callback);
};
