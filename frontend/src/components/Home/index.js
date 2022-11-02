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
let searchTerminQueue = '';

const mapStateToProps = (state) => ({
  ...state.home,
  appName: state.common.appName,
  token: state.common.token,
  inProgress: state.wordList.inProgress
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
    if (this.props.inProgress) {
      searchTerminQueue = e.target.value; //override the previous term in queue (we don't care for rotten terms)
      console.log('Query waits in queue. next query set to: '+searchTerminQueue);
    }
    else
      this.sendQuery(e.target.value);
  }

  componentDidUpdate(prevProps,prevState){
    //if sync completed and there was a query in queue - send it now
    //console.log("currentprops inprogress=" + this.props.inProgress + ", prev-Props:" + prevProps.inProgress + ", query:" + searchTerminQueue);
    if (!this.props.inProgress && prevProps.inProgress && searchTerminQueue !== ''){
      //console.log('Inprogress changed to false. Now sending '+searchTerminQueue);
      this.sendQuery(searchTerminQueue);
      searchTerminQueue = '';
    }
  }
  sendQuery(queryString){
    console.log('Actual sending Query: ' + queryString);
    const wordsPromise = agent.Words.bySearch;
    this.props.onSearchTermChange(
        wordsPromise,
        Promise.all([agent.Words.bySearch(queryString), wordsPromise()])
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
          <div className="spinner-grow" role="status" hidden={!this.props.inProgress}>
            <span className="sr-only">Loading...</span>
          </div>
        </div>
        <div className="container page">
          <MainView />
        </div>
      </div>
    );
  }
}

  export default connect(mapStateToProps, mapDispatchToProps)(Home);
