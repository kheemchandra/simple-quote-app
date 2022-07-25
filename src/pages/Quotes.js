import { Fragment, useState } from "react";

import QuoteList from "../components/quotes/QuoteList";
import NoQuotesFound from "../components/quotes/NoQuotesFound";
import Spinner from "../components/UI/Spinner";
// const QUOTES = [];

const Quotes = (props) => { 
   const [spinning, setSpinning] = useState(true);

  let content = <NoQuotesFound />;

  if(props.quotes.length){
    content = <QuoteList quotes={props.quotes} />
  }

  setTimeout(() => {
    setSpinning(false);
  }, 350);

  return <Fragment>
    {spinning && <Spinner />}
    {!spinning && content}
  </Fragment>
};

export default Quotes;