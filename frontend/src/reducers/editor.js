import {
  EDITOR_PAGE_LOADED,
  EDITOR_PAGE_UNLOADED,
  WORD_SUBMITTED,
  ASYNC_START,
} from "../constants/actionTypes";

const reducer = (state = {}, action) => {
  switch (action.type) {
    case EDITOR_PAGE_LOADED:
      return {
        ...state,
        wordSlug: action.payload ? action.payload.word.slug : "",
        title: action.payload ? action.payload.word.title : "",
        body: action.payload ? action.payload.word.body : "",
      };
    case EDITOR_PAGE_UNLOADED:
      return {};
    case WORD_SUBMITTED:
      return {
        ...state,
        inProgress: null,
        errors: action.error ? action.payload.errors : null,
      };
    case ASYNC_START:
      if (action.subtype === WORD_SUBMITTED) {
        return { ...state, inProgress: true };
      }
      break;
    default:
      return state;
  }

  return state;
};

export default reducer;
