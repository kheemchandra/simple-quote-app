import { Fragment } from "react";

import QuoteList from "../components/quotes/QuoteList";
import NoQuotesFound from "../components/quotes/NoQuotesFound";

// const QUOTES = [];

const Quotes = (props) => { 
   
  let content = <NoQuotesFound />;

  if(props.quotes.length){
    content = <QuoteList quotes={props.quotes} />
  }

  return <Fragment>
    {content}
  </Fragment>
};

export default Quotes;