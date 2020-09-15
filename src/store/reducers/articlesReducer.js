import * as Types from '../types';
import { config } from '../../services/config';

const initialState = {
  isLoading: false,
  error: null,
  articles: [],
  hasMoreItems: true,
};

const articlesReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case Types.LOAD_ARTICLES_INIT:
      return {
        ...state,
        isLoading: true,
      };
    case Types.LOAD_ARTICLES_ERROR:
      return {
        ...state,
        isLoading: false,
        hasMoreItems: false,
        error: payload,
      };
    case Types.LOAD_ARTICLES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        hasMoreItems: payload.length > config.pageSize,
        error: null,
        articles: payload,
      };

    default:
      return state;
  }
};

export default articlesReducer;
