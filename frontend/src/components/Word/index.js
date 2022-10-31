
import React from "react";
import agent from "../../agent";
import { connect } from "react-redux";
// import marked from "marked";
import {
  WORD_PAGE_LOADED,
  WORD_PAGE_UNLOADED,
} from "../../constants/actionTypes";

const mapStateToProps = (state) => ({
  ...state,
  currentUser: state.common.currentUser,
  word: state.word.word
});

const mapDispatchToProps = (dispatch) => ({
  onLoad: (payload) => dispatch({ type: WORD_PAGE_LOADED, payload }),
  onUnload: () => dispatch({ type: WORD_PAGE_UNLOADED }),
});

class Word extends React.Component {
  componentDidMount() {

    console.log(this.props.match.params.id);
    console.log(this.props.word);

    this.props.onLoad(
      Promise.all([
        agent.Words.get(this.props.match.params.id),
      ])
    );
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    if (!this.props.word) {
      console.log(this.props);
      return (
          <div className="text-dark">
            <div className="row bg-white p-4">
              Cannot find the word yet...
            </div>
          </div>
      )
    }

    // const markup = {
    //   __html: marked(this.props.word.description, { sanitize: true }),
    // };

    return (
      <div className="container page">
        <div className="text-dark">
          <div className="row bg-white p-4">
            <h3>WORD: {this.props.word.title}</h3>
            <div className="col-6">
              <img
                src={this.props.word.image}
                alt={this.props.word.title}
                className="word-img"
                style={{ height: "500px", width: "100%", borderRadius: "6px" }}
              />
            </div>

            <div className="col-6">
              <h1>{this.props.word.title}</h1>
              <h4>{this.props.word.body}</h4>
              {/*<h4>{markup}</h4>*/}
            </div>
          </div>

          <div className="row bg-light-gray p-4">

          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Word);
