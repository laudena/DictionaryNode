import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
const DEFAULT_IMAGE = "/placeholder.png";

const mapDispatchToProps = (dispatch) => ({

});

const Wordly = (props) => {
  const word = props.word;
  if (!word){
    return <div>...Loading...</div>;
  }

  else {
    return (
        <div
            className="card bg-light border-light p-3"
            style={{borderRadius: "20px"}}
        >
          <img
              alt="word"
              src={word.image || DEFAULT_IMAGE}
              className="card-img-top word-img"
              style={{borderRadius: "20px"}}
          />
          <div className="card-body">
            <Link to={`/word/${word.slug}`} className="text-dark">
              <h3 className="card-title">{word.title}</h3>
              <p className="card-text crop-text-3">{word.body}</p>
              <p className="card-text crop-text-3">{word.created_at}</p>
              <p className="card-text crop-text-3">{word.title_english}</p>
            </Link>
          </div>
        </div>
    );
  }
};

export default connect(() => ({}), mapDispatchToProps)(Word);
