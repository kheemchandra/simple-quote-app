import { Fragment, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import HighlightedQuote from '../components/quotes/HighlightedQuote';
import QuoteComments from './QuoteComments';
import Spinner from "../components/UI/Spinner";
import { useSpinner } from '../hooks/use-Spinner';

const Quote = (props) => {
  const { spinning, toggleSpinner } = useSpinner(true); 

  const { id:quoteID } = useParams();

  const quote = props.quotes.find( q => q.id === quoteID)

  let content = <h1 style={{textAlign: 'center'}}>Error 404</h1>
  if(quote){
    content = <Fragment>
    <HighlightedQuote author={quote.author} text={quote.text}/>
    <QuoteComments />
  </Fragment>;
  } 
 
  useEffect(() => {
    toggleSpinner();
  }, [toggleSpinner]);

  return <Fragment>
    {spinning && <Spinner />}
    {!spinning && content}
  </Fragment>
};

export default Quote;