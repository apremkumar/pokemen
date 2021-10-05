import './App.css';
import Navbar from './components/Navbar';
import PokemonList from './components/PokemonList';
import PokemonInfo from './components/PokemonInfo';

import { Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";

const history = createBrowserHistory();

function App() {
  return (
    <div>
      <Navbar />
      <Router history={history}>
        <Switch>
          <Route path="/pokemon" component={PokemonInfo} />
          <Route path="/">
            <PokemonList />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
