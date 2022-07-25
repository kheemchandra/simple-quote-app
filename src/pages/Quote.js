import { Fragment, useState } from 'react';
import { useParams } from 'react-router-dom';

import HighlightedQuote from '../components/quotes/HighlightedQuote';
import QuoteComments from './QuoteComments';
import Spinner from "../components/UI/Spinner";


const Quote = (props) => {
  const [spinning, setSpinning] = useState(true);
  const { id:quoteID } = useParams();

  const quote = props.quotes.find( q => q.id === quoteID)

  let content = <h1>Error 404</h1>
  if(quote){
    content = <Fragment>
    <HighlightedQuote author={quote.author} text={quote.text}/>
    <QuoteComments />
  </Fragment>;
  } 

  setTimeout(() => {
    setSpinning(false);
  }, 350);

  return <Fragment>
    {spinning && <Spinner />}
    {!spinning && content}
  </Fragment>
};

export default Quote;