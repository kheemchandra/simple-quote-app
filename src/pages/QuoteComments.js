import { Fragment } from "react";
import { Route, useParams, Link } from "react-router-dom";


import Comments from "../components/comments/Comments";


const QuoteComments = (props) => {
  const { id: quoteID } = useParams();

  return (
    <Fragment>
      <Route path='/quotes/:id/detail' exact>
        <p style={{ textAlign: "center" }}>
          <Link
            style={{ color: "teal" }}
            to={`/quotes/${quoteID}/detail/comments`}
          >
            Load Comments
          </Link>
        </p>
      </Route>
      <Route path="/quotes/:id/detail/comments">
        <Comments/>
      </Route>
    </Fragment>
  );
};

export default QuoteComments;
