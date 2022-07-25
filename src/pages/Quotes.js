import { Fragment, useEffect } from "react";

import QuoteList from "../components/quotes/QuoteList";
import NoQuotesFound from "../components/quotes/NoQuotesFound";
import Spinner from "../components/UI/Spinner";
import { useSpinner } from "../hooks/use-Spinner";
// const QUOTES = [];

const Quotes = (props) => { 
  const { spinning, toggleSpinner } = useSpinner(true); 

  let content = <NoQuotesFound />;

  if(props.quotes.length){
    content = <QuoteList quotes={props.quotes} />
  }
 
  useEffect(() => {
    toggleSpinner();
  }, [toggleSpinner]);

  return <Fragment>
    {spinning && <Spinner />}
    {!spinning && content}
  </Fragment>
};

export default Quotes;