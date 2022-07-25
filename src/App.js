import { useState } from "react";
import { Switch, Route } from "react-router-dom";

import MainNavigation from "./components/layout/MainNavigation";
import Quotes from "./pages/Quotes";
import Quote from "./pages/Quote";
import NewQuote from "./pages/NewQuote";

import classes from "./components/layout/Layout.module.css";

const QUOTES = [
  { id: "q1", author: "Test", text: "This is a test!" },
  { id: "q2", author: "Max", text: "This works!" },
  { id: "q3", author: "Kheem", text: "My first quote!" },
];

function App() {
  const [quotes, setQuotes] = useState(structuredClone(QUOTES) || []);
  const [isLoading, setIsLoading] = useState(false);
  const [hideSpinner, setHideSpinner] = useState(false);


  const addQuoteHandler = (quote) => {
    QUOTES.unshift({
      id: Math.random().toString(),
      author: quote.author,
      text: quote.text,
    });
    setQuotes(structuredClone(QUOTES));
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setHideSpinner(true);
    }, 350);
  };

  const spinnerHandler = () => {
    setHideSpinner(false);
  };

  return (
    <div>
      <MainNavigation />
      <main className={classes.main}>
        <Switch>
          <Route path="/quotes" exact>
            <Quotes quotes={quotes} />
          </Route>
          <Route path="/quotes/:id/detail">
            <Quote quotes={quotes} />
          </Route>
          <Route path="/quote/new">
            <NewQuote
              onAddQuote={addQuoteHandler}
              isLoading={isLoading}
              hideSpinner={hideSpinner}
              onSpinner={spinnerHandler}
            />
          </Route>
        </Switch>
      </main>
    </div>
  );
}

export default App;
