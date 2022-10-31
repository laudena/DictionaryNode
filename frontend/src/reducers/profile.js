import {
  PROFILE_PAGE_LOADED,
  PROFILE_PAGE_UNLOADED,
} from "../constants/actionTypes";

const reducer = (state = {}, action) => {
  switch (action.type) {
    case PROFILE_PAGE_LOADED:
      return {
        ...action.payload.profile,
      };
    case PROFILE_PAGE_UNLOADED:
      return {};

    default:
      return state;
  }
};

export default reducer;
