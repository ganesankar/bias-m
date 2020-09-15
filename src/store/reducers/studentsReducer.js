import * as Types from '../types';
import { config } from '../../services/config';

const initialState = {
  isLoading: false,
  error: null,
  students: [],
  hasMoreItems: true,
};

const studentsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case Types.LOAD_STUDENTS_INIT:
      return {
        ...state,
        isLoading: true,
      };
    case Types.LOAD_STUDENTS_ERROR:
      return {
        ...state,
        isLoading: false,
        hasMoreItems: false,
        error: payload,
      };
    case Types.LOAD_STUDENTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        hasMoreItems: payload.length > config.pageSize,
        error: null,
        students: payload,
      };

    default:
      return state;
  }
};

export default studentsReducer;
