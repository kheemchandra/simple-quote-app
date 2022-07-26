import { useState, Fragment } from "react";
import { Route, Redirect } from "react-router-dom";

import QuoteForm from "../components/quotes/QuoteForm";

const NewQuote = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const addQuoteHandler = async (quote) => {
    setIsLoading(true);
    const response = await fetch('https://films-fetch-default-rtdb.firebaseio.com/quotes.json', {
      method: 'POST',
      body: JSON.stringify({...quote})
    })
    setIsLoading(false);
    setRedirect(true);
  }  

  return <Fragment>
    {redirect && <Route path='/quote/new'>
      <Redirect to='/quotes' />
      </Route>}
    <QuoteForm
      onAddQuote={addQuoteHandler}
      isLoading={isLoading} 
    />
  </Fragment>
};

export default NewQuote;
