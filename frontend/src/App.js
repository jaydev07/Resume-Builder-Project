import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';

import './App.css';
import Auth from "./authentication/Auth";

function App() {
  return (
        <Router>
          <Switch>
            
            <Route path="/" exact>
              <Auth />
            </Route>

            <Redirect to="/" />
          
          </Switch>
        </Router>
  );
}

export default App;