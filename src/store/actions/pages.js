import * as Types from '../types';
import { showToast } from './toast';
import axios from 'axios';
import qs from 'qs';

export const loadStudentsInit = () => ({
  type: Types.LOAD_STUDENTS_INIT,
});

export const loadStudentsError = (, error) => (
  dispatch,
  getState,
) => {
  dispatch(showToast({ title: 'Error', text: error }));
  dispatch({
    type: Types.LOAD_STUDENTS_ERROR,
    payload: error,
  });
};

export const loadStudentsSuccess = ( students) => ({
  type:  Types.LOAD_STUDENTS_SUCCESS,
  payload: students,
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

export const loadStudents = (params, callback) => async (
  dispatch,
  getState,
) => {
  dispatch(loadStudentsInit());

  errorHandler(
    async (params, callback) => {
      const baseUrl =
        'https://revit8apps.netlify.app/.netlify/functions/students-read-all';
      const response = await axios.get(baseUrl);
      const students = response.data;

      const studentsWithAdverts = students;
      dispatch(loadStudentsSuccess, studentsWithAdverts));
      if (callback) callback();
    },
    loadStudentsError,
    dispatch,
  )(params, callback);
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
