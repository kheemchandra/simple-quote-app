import { Switch, Route, Redirect } from "react-router-dom";

import MainNavigation from "./components/layout/MainNavigation";
import Quotes from "./pages/Quotes";
import NewQuote from "./pages/NewQuote";

import classes from "./components/layout/Layout.module.css";

function App() { 

  return (
    <div>
      <MainNavigation />
      <main className={classes.main}>
        <Switch>
          <Route path="/" exact>
            <Redirect to="/quotes" />
          </Route>
          <Route path="/quotes" >
            <Quotes />
          </Route> 
          <Route path="/quote/new">
            <NewQuote />
          </Route>
        </Switch>
      </main>
    </div>
  );
}

export default App;
