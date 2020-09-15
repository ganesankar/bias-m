import * as Types from '../types';
import { showToast } from './toast';
import axios from 'axios';

import { apiConfig } from '../../services/api';
export const loadStudentsInit = () => ({
  type: Types.LOAD_STUDENTS_INIT,
});

export const loadStudentsError = (error) => (dispatch, getState) => {
  dispatch(showToast({ title: 'Error', text: error }));
  dispatch({ type: Types.LOAD_STUDENTS_ERROR, payload: error });
};

export const loadStudentsSuccess = (products) => ({
  type: Types.LOAD_STUDENTS_SUCCESS,
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

export const loadStudents = (params, isLoadMoreRequest, callback) => async (
  dispatch,
  getState,
) => {
  dispatch(loadStudentsInit());

  errorHandler(
    async (params, isLoadMoreRequest, callback) => {
      const baseUrl = `${apiConfig.base}${apiConfig.students.url}`;
      const response = await axios.get(baseUrl);
      dispatch(loadStudentsSuccess(response.data));
      if (callback) callback();
    },
    loadStudentsError,
    dispatch,
  )(params, isLoadMoreRequest, callback);
};
