import * as Types from '../types';
import { config } from '../../services/config';

const initialState = {
  isLoading: false,
  error: null,
  semesters: [],
  hasMoreItems: true,
};

const semestersReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case Types.LOAD_SEMESTERS_INIT:
      return {
        ...state,
        isLoading: true,
      };
    case Types.LOAD_SEMESTERS_ERROR:
      return {
        ...state,
        isLoading: false,
        hasMoreItems: false,
        error: payload,
      };
    case Types.LOAD_SEMESTERS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        hasMoreItems: payload.length > config.pageSize,
        error: null,
        semesters: payload,
      };

    default:
      return state;
  }
};

export default semestersReducer;
