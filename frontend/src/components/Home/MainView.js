import WordList from "../WordList";
import React from "react";
import { connect } from "react-redux";

const mapStateToProps = (state) => ({
  ...state.wordList,
  tags: state.home.tags,
  token: state.common.token,
});

const MainView = (props) => {
  return (
    <div>
      <div className="feed-toggle">
        <ul className="nav nav-tabs"></ul>
      </div>
      <div></div>

      <WordList
        pager={props.pager}
        words={props.words}
        loading={props.loading}
        wordsCount={props.wordsCount}
        currentPage={props.currentPage}
      />
    </div>
  );
};

export default connect(mapStateToProps)(MainView);
