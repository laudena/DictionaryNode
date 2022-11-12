// import WordPreview from "./WordPreview";
import ListPagination from "./ListPagination";
import React from "react";

const WordList = (props) => {
  if (!props.words || props.words.length === 0) {
    return <div className="py-4 no-words">אין מילים להציג</div>;
  }

  return (
    <div className="container py-2 hebrew">
      <div className="two-columns border-end col border-middle">
        <div className="separation-line"></div>
        {props.words.map((word) => {
          return (
            <div
              className="col-md-6 pb-2 pr-5 hebrew headerStyle"
              key={word.slug}
            >
              <div
                className="hebrew"
                dangerouslySetInnerHTML={{ __html: word.body }}
              ></div>
              {/*<WordPreview word={word} />*/}
            </div>
          );
        })}
      </div>

      <ListPagination
        pager={props.pager}
        wordsCount={props.wordsCount}
        words={props.words}
        currentPage={props.currentPage}
      />
    </div>
  );
};

export default WordList;
