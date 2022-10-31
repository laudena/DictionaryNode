import word from "./reducers/word";
import wordList from "./reducers/wordList";
import auth from "./reducers/auth";
import { combineReducers } from "redux";
import common from "./reducers/common";
import home from "./reducers/home";
import settings from "./reducers/settings";
import { routerReducer } from "react-router-redux";

export default combineReducers({
  word,
  wordList,
  auth,
  common,
  home,
  settings,
  router: routerReducer,
});
