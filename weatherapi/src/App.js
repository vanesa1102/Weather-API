import React, { useContext } from 'react'
import Inicio from './components/Inicio';
import Ciudad from './components/Ciudad';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/:idCiudad" render={(props) => <Ciudad {...props} />} />
          <Route path="" component={Inicio} />
        </Switch>
      </div>

    </Router>

  );
}

export default App;
