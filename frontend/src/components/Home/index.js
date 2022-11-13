import Banner from "./Banner";
import MainView from "./MainView";
import React from "react";
import agent from "../../agent";
import { connect } from "react-redux";
import {
  HOME_PAGE_LOADED,
  HOME_PAGE_UNLOADED,
} from "../../constants/actionTypes";
import { Link } from "react-router-dom";

const Promise = global.Promise;
let searchTerminQueue = "";
const SEARCH_BOX_PLACEHOLDER = "חיפוש...";
const mapStateToProps = (state) => ({
  ...state.home,
  appName: state.common.appName,
  token: state.common.token,
  inProgress: state.wordList.inProgress,
  status: state.wordList.status,
});

const mapDispatchToProps = (dispatch) => ({
  onLoad: (pager, payload) =>
    dispatch({ type: HOME_PAGE_LOADED, pager, payload }),
  onUnload: () => dispatch({ type: HOME_PAGE_UNLOADED }),
  onSearchTermChange: (pager, payload) =>
    dispatch({ type: HOME_PAGE_LOADED, pager, payload }),
});

class Home extends React.Component {
  componentWillMount() {
    const wordsPromise = agent.Words.all;
    //const loginPromise = agent.User.all;
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
    } else this.sendQuery(e.target.value);
  };

  componentDidUpdate(prevProps, prevState) {
    //if sync completed and there was a query in queue - send it now
    //console.log("currentprops inprogress=" + this.props.inProgress + ", prev-Props:" + prevProps.inProgress + ", query:" + searchTerminQueue);
    if (
      !this.props.inProgress &&
      prevProps.inProgress &&
      searchTerminQueue !== ""
    ) {
      //console.log('Inprogress changed to false. Now sending '+searchTerminQueue);
      this.sendQuery(searchTerminQueue);
      searchTerminQueue = "";
    }
  }
  sendQuery(queryString) {
    console.log("Actual sending Query: " + queryString);
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
            placeholder={SEARCH_BOX_PLACEHOLDER}
            hidden={this.props.status !== 200}
          />
          <div
            className="spinner-grow"
            role="status"
            hidden={!this.props.inProgress}
          >
            <span className="sr-only">Loading...</span>
          </div>
        </div>

        <div className="container page">
          <div
            className="alert alert-danger text-start"
            role="alert"
            hidden={this.props.status === 200}
          >
            {(!this.props.status || this.props.status === 401) && (
              <div className="hebrew">
                &nbsp; יש להיכנס למערכת.&nbsp;&nbsp;
                <Link to="/login">
                  <i className="bi bi-arrow-return-left"></i>&nbsp;כניסה
                </Link>
              </div>
            )}
            {this.props.status !== 401 ? "Error: #" + this.props.status : ""}
          </div>
        </div>
        <div className="container page" hidden={this.props.status !== 200}>
          <MainView />
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
