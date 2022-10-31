import {
  SET_PAGE,
  HOME_PAGE_LOADED,
  HOME_PAGE_UNLOADED,
  PROFILE_PAGE_LOADED,
  PROFILE_PAGE_UNLOADED
} from "../constants/actionTypes";

const reducer = (state = {}, action) => {
  switch (action.type) {
    case SET_PAGE:
      return {
        ...state,
        words: action.payload.words[0].words,
        wordsCount: action.payload.words[0].wordsCount,
        currentPage: action.page,
      };
    case HOME_PAGE_LOADED:
      console.log('in reducer wordList (HOME_PAGE_LOADED):');
      console.log(action.payload[0].words);
      return {
        ...state,
        pager: action.pager,
        words: action.payload[0].words,
        wordsCount: action.payload[0].wordsCount,
        currentPage: 0
      };
    case HOME_PAGE_UNLOADED:
      return {};
    case PROFILE_PAGE_LOADED:
      return {
        ...state,
        pager: action.pager,
        words: action.payload[0].words,
        wordsCount: action.payload[0].wordsCount,
        currentPage: 0,
      };
    case PROFILE_PAGE_UNLOADED:
      return {};
    default:
      return state;
  }
};

export default reducer;
