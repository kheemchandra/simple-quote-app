import { Fragment } from 'react';
import { useParams } from 'react-router-dom';

import HighlightedQuote from '../components/quotes/HighlightedQuote';
import QuoteComments from './QuoteComments';


const Quote = (props) => {
  const { id:quoteID } = useParams();

  const quote = props.quotes.find( q => q.id === quoteID)

  if(!quote) return <h1>Error 404</h1>
  return <Fragment>
    <HighlightedQuote author={quote.author} text={quote.text}/>
    <QuoteComments />
  </Fragment>
};

export default Quote;