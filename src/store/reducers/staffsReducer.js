import * as Types from '../types';
import { config } from '../../services/config';

const initialState = {
  isLoading: false,
  error: null,
  staffs: [],
  hasMoreItems: true,
};

const staffsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case Types.LOAD_STAFFS_INIT:
      return {
        ...state,
        isLoading: true,
      };
    case Types.LOAD_STAFFS_ERROR:
      return {
        ...state,
        isLoading: false,
        hasMoreItems: false,
        error: payload,
      };
    case Types.LOAD_STAFFS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        hasMoreItems: payload.length > config.pageSize,
        error: null,
        staffs: payload,
      };

    default:
      return state;
  }
};

export default staffsReducer;
