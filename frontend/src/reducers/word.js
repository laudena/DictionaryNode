import { WORD_PAGE_LOADED, WORD_PAGE_UNLOADED } from "../constants/actionTypes";

const reducer = (state = {}, action) => {
  switch (action.type) {
    case WORD_PAGE_LOADED:
      if (action.error) return {};

      console.log("in reducer word (WORD_PAGE_LOADED):");
      console.log(action.payload[0]);
      return {
        ...state,
        word: action.payload[0],
      };
    case WORD_PAGE_UNLOADED:
      return {};

    default:
      return state;
  }
};

export default reducer;
