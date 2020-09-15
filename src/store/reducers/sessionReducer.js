import * as Types from '../types';
import { config } from '../../services/config';

const initialState = {
  isLoading: false,
  error: null,
  sessions: [],
  hasMoreItems: true,
};

const sessionReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case Types.LOAD_SESSION_INIT:
      return {
        ...state,
        isLoading: true,
      };
    case Types.LOAD_SESSION_ERROR:
      return {
        ...state,
        isLoading: false,
        hasMoreItems: false,
        error: payload,
      };
    case Types.LOAD_SESSION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        hasMoreItems: payload.length > config.pageSize,
        error: null,
        sessions: payload,
      };

    default:
      return state;
  }
};

export default sessionReducer;
