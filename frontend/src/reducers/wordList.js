import {
  SET_PAGE,
  HOME_PAGE_LOADED,
  HOME_PAGE_UNLOADED,
  PROFILE_PAGE_LOADED,
  PROFILE_PAGE_UNLOADED,
  ASYNC_START,
  ASYNC_END,
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
    case ASYNC_START:
      if (action.subtype === HOME_PAGE_LOADED) {
        return { ...state, inProgress: true };
      } else return {};
    case ASYNC_END:
      return { ...state, inProgress: false };

    case HOME_PAGE_LOADED:
      if (action.error) {
        //handle errors
        let status = action.payload.errors
          ? action.payload.errors.error.status
          : action.payload.message
          ? action.payload.message
          : action.payload;
        console.log("ERRRO in HOME_PAGE_LOADED: " + status);
        return {
          ...state,
          pager: action.pager,
          words: [],
          wordsCount: 0,
          currentPage: 0,
          status: status,
          inProgress: false,
        };
      } else {
        console.log("in reducer wordList (HOME_PAGE_LOADED):");
        console.log(action.payload[0].words);
        return {
          ...state,
          pager: action.pager,
          words: action.payload[0].words,
          wordsCount: action.payload[0].wordsCount,
          currentPage: 0,
          status: 200,
          inProgress: false,
        };
      }
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
