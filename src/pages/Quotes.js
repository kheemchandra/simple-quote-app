import { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import QuoteList from "../components/quotes/QuoteList";
import NoQuotesFound from "../components/quotes/NoQuotesFound";
import Spinner from "../components/UI/Spinner";
import Quote from "./Quote";

import { fetchData } from "../store/actions";
import { quoteActions } from "../store/quotesSlice";

const URL = "https://films-fetch-default-rtdb.firebaseio.com/quotes.json";

const Quotes = () => {
  const dispatch = useDispatch();
  const [spinning, setSpinning] = useState(true);
  const quotes = useSelector((store) => store.quotes.quotes); 

  let content = <QuoteList quotes={quotes} />;

  if (quotes.length === 0) {
    content = <NoQuotesFound />;
  }

  useEffect(() => {
    const applyData = (data) => { 
      const quotesArr = [];
      for (const id in data) {
        quotesArr.unshift({
          id,
          ...data[id],
        });
      }
      dispatch(quoteActions.updateQuotes(quotesArr));
    };

    const cbs = {
      afterCB: () => {
        setSpinning(false);
      }
    }
    dispatch(fetchData({ URL, applyData }, cbs)); 
  }, [dispatch]);

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
