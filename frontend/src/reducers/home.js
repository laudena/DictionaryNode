import { HOME_PAGE_LOADED, HOME_PAGE_UNLOADED } from "../constants/actionTypes";

const reducer = (state = {}, action) => {
  switch (action.type) {
    case HOME_PAGE_LOADED:
      return {};
    case HOME_PAGE_UNLOADED:
      return {};
    default:
      return state;
  }
};

export default reducer;
