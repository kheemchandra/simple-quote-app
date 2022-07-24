import { useState, Fragment } from "react";
import { Route, Redirect } from "react-router-dom";

import QuoteForm from "../components/quotes/QuoteForm";

const NewQuote = (props) => {
  const [redirect, setRedirect] = useState(false);

  const observeHandler = () => { 
    setRedirect(true);
    props.onSpinner();
  };

  return <Fragment>
    {redirect && <Route path='/quote/new'>
      <Redirect to='/quotes' />
      </Route>}
    <QuoteForm
      onAddQuote={props.onAddQuote}
      isLoading={props.isLoading}
      hideSpinner={props.hideSpinner}
      onObserve={observeHandler}
    />
  </Fragment>
};

export default NewQuote;
