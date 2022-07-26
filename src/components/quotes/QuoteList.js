import { Fragment, useState } from 'react';

import QuoteItem from './QuoteItem';
import classes from './QuoteList.module.css';

let ascending = false;

const QuoteList = (props) => { 
  const [ quotes, setQuotes ] = useState(props.quotes); 

  const sortHandler = () => {
    let q = quotes.slice();
    q.sort( (a, b) => {
      let {text:ta, author:aa} = a;
      let {text:tb, author:ab} = b;
      ta = ta.toLowerCase();
      tb = tb.toLowerCase();
      aa = aa.toLowerCase();
      ab = ab.toLowerCase();
      if(ta < tb)return -1;
      else if(ta > tb) return 1;
      else{
        if(aa < ab)return -1;
        else if(aa === ab)return 0;
        else return 1;
      }
    });
    if(ascending){
      q.reverse()
    }  
    ascending = !ascending; 
    setQuotes(q);
  }
 
  return (
    <Fragment>
      <div className={classes.sorting}>
        <button onClick={sortHandler}>Sort {`${!ascending ? 'Ascending': 'Descending'}`}</button>
      </div>
      <ul className={classes.list}>
        {quotes.map((quote) => (
          <QuoteItem
            key={quote.id}
            id={quote.id}
            author={quote.author}
            text={quote.text}
          />
        ))}
      </ul>
    </Fragment>
  );
};

export default QuoteList;
