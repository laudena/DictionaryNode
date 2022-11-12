import { Link } from "react-router-dom";
import React from "react";
import agent from "../../agent";
import { connect } from "react-redux";

const mapDispatchToProps = (dispatch) => ({
  onClickDelete: (payload) => dispatch({ type: DELETE_WORD, payload }),
});

const WordActions = (props) => {
  const word = props.word;
  const del = () => {
    props.onClickDelete(agent.Words.del(word.slug));
  };
  if (props.canModify) {
    return (
      <span>
        <Link
          to={`/editor/${word.slug}`}
          className="btn btn-outline-dark btn-sm mr-2"
        >
          <i className="ion-edit"></i> Edit Word
        </Link>

        <button className="btn btn-outline-danger btn-sm" onClick={del}>
          <i className="ion-trash-a"></i> Delete Word
        </button>
      </span>
    );
  }

  return <span></span>;
};

export default connect(() => ({}), mapDispatchToProps)(WordActions);
