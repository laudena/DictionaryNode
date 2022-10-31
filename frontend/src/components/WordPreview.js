import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const mapDispatchToProps = (dispatch) => ({
  // favorite: (slug) =>
  //   dispatch({
  //     type: WORD_FAVORITED,
  //     payload: agent.Words.favorite(slug),
  //   }),
  // unfavorite: (slug) =>
  //   dispatch({
  //     type: WORD_UNFAVORITED,
  //     payload: agent.Words.unfavorite(slug),
  //   }),
});


const WordPreview = (props) => {
  const word = props.word;

  return (
    <div
      className="card bg-light border-light p-3"
      style={{ borderRadius: "20px" }}
    >
      <div className="card-body">
        <Link to={`/word/${word.slug}`} className="text-dark">
          <h3 className="card-title">{word.title}</h3>
          <div>{props.word.body}</div>
        </Link>
      </div>
    </div>
  );
};

export default connect(() => ({}), mapDispatchToProps)(WordPreview);
