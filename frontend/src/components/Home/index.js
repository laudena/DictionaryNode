import Banner from "./Banner";
import MainView from "./MainView";
import React from "react";
import agent from "../../agent";
import { connect } from "react-redux";
import {
  HOME_PAGE_LOADED,
  HOME_PAGE_UNLOADED
} from "../../constants/actionTypes";

const Promise = global.Promise;

const mapStateToProps = (state) => ({
  ...state.home,
  appName: state.common.appName,
  token: state.common.token
});

const mapDispatchToProps = (dispatch) => ({
  onLoad: (pager, payload) =>
    dispatch({ type: HOME_PAGE_LOADED, pager, payload }),
  onUnload: () => dispatch({ type: HOME_PAGE_UNLOADED }),
  onSearchTermChange: (pager, payload) =>
      dispatch({ type: HOME_PAGE_LOADED, pager, payload })
});

class Home extends React.Component {
  componentWillMount() {
    const wordsPromise = agent.Words.all;

    this.props.onLoad(
      wordsPromise,
      Promise.all([agent.Words.all(), wordsPromise()])
    );
  }

  componentWillUnmount() {
    this.props.onUnload();
  }
  handleChange = (e) => {
    console.log('search term changed:' + e.target.value);
    const wordsPromise = agent.Words.bySearch;
    this.props.onSearchTermChange(
        wordsPromise,
        Promise.all([agent.Words.bySearch(e.target.value), wordsPromise()])
    );
  }

  render() {
    return (
      <div className="home-page">
        <Banner />
        <div className="container">
          <input
              className="search-input-text hebrew .input-lg offset-lg-8 col-lg-3"
              type="text"
              onChange={this.handleChange}
              placeholder="התחל לכתוב כאן..."
          />
        </div>
        <div className="container page">
          <MainView />
        </div>
      </div>
    );
  }
}

  export default connect(mapStateToProps, mapDispatchToProps)(Home);
