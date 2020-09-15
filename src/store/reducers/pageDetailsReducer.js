import * as Types from '../types';

const initialState = {
  isLoading: false,
  error: null,
  page: null,
};

const pageDetailsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case Types.LOAD_PAGE_INIT:
      return {
        ...state,
        isLoading: true,
      };
    case Types.LOAD_PAGE_ERROR:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };
    case Types.LOAD_PAGE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        page: payload,
      };

    default:
      return state;
  }
};

export default pageDetailsReducer;
