import React from "react";
import agent from "../agent";
import { connect } from "react-redux";
import { SET_PAGE } from "../constants/actionTypes";

const mapDispatchToProps = (dispatch) => ({
  onSetPage: (page, payload) => dispatch({ type: SET_PAGE, page, payload }),
});

const ListPagination = (props) => {
  if (props.wordsCount <= 20) {
    return null;
  }

  const range = [];
  for (let i = 0; i < Math.ceil(props.wordsCount / 20); ++i) {
    range.push(i);
  }

  const setPage = (page) => {
    if (props.pager) {
      props.onSetPage(page, props.pager(page));
    } else {
      props.onSetPage(page, agent.Words.all(page));
    }
  };

  return (
    <nav>
      <ul className="pagination">
        {range.map((v) => {
          const isCurrent = v === props.currentPage;
          const onClick = (ev) => {
            ev.preventDefault();
            setPage(v);
          };
          return (
            <li
              className={isCurrent ? "page-word active" : "page-word"}
              onClick={onClick}
              key={v.toString()}
            >
              <button className="page-link">{v + 1}</button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default connect(() => ({}), mapDispatchToProps)(ListPagination);
