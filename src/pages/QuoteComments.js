import { Fragment } from "react";
import { Route, useParams, Link } from "react-router-dom";

import Comments from "../components/comments/Comments"; 

const QuoteComments = (props) => {
  const { id: quoteID } = useParams();

  return (
    <Fragment>
      <Route path="/quotes/:id/detail" exact>
        <div style={{textAlign: 'center'}}>
          <Link 
            to={`/quotes/${quoteID}/detail/comments`}
          >
            <button className="btn--flat">
              Load Comments
            </button>
          </Link>
        </div>
      </Route>
      <Route path="/quotes/:id/detail/comments">
        <Comments />
      </Route>
    </Fragment>
  );
};

export default QuoteComments;
