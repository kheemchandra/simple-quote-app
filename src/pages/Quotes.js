import { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";

import QuoteList from "../components/quotes/QuoteList";
import NoQuotesFound from "../components/quotes/NoQuotesFound";
import Spinner from "../components/UI/Spinner";
import Quote from "./Quote";

const Quotes = () => {
  const [spinning, setSpinning] = useState(true);
  const [quotes, setQuotes] = useState([]);
  const [noQuotes, setNoQuotes] = useState(false);

  let content = <QuoteList quotes={quotes} />;

  if (noQuotes) {
    content = <NoQuotesFound />;
  }

  useEffect(() => {
    const fetchQuotes = async () => {
      const response = await fetch(
        "https://films-fetch-default-rtdb.firebaseio.com/quotes.json"
      );
      const data = await response.json();
      const quotesArr = [];
      for (const id in data) {
        quotesArr.unshift({
          id,
          ...data[id],
        });
      }
      setQuotes(quotesArr);
      if (quotesArr.length === 0) {
        setNoQuotes(true);
      }
      setSpinning(false);
    };
    fetchQuotes(); 
  }, []);

  return (
    <Switch>
      <Route path="/quotes" exact>
        {spinning && <Spinner />}
        {!spinning && content}
      </Route>
      <Route path="/quotes/:id/detail">
        <Quote quotes={quotes} />
      </Route>
    </Switch>
  );
};

export default Quotes;
