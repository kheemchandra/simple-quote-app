import { useState, Fragment } from "react";
import { Route, Redirect } from "react-router-dom";
import { useDispatch } from "react-redux/es/exports";

import QuoteForm from "../components/quotes/QuoteForm";
import { fetchData } from "../store/actions"; 

const URL = 'https://films-fetch-default-rtdb.firebaseio.com/quotes.json';

const NewQuote = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const addQuoteHandler = async (quote) => {
    const cbs = {
      beforeCB: () => { setIsLoading(true); },
      afterCB: () => { setRedirect(true); } 
    };

    dispatch(fetchData({
      URL: URL,
      method: 'POST',
      data: quote       
    }, cbs)); 
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
