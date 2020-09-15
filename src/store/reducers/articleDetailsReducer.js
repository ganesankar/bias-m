import * as Types from '../types';

const initialState = {
  isLoading: false,
  error: null,
  article: null,
};

const pageDetailsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case Types.LOAD_ARTICLE_INIT:
      return {
        ...state,
        isLoading: true,
      };
    case Types.LOAD_ARTICLE_ERROR:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };
    case Types.LOAD_ARTICLE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        article: payload,
      };

    default:
      return state;
  }
};

export default pageDetailsReducer;
