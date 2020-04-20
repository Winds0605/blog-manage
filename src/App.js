import React, { useReducer } from 'react';
import { Route, Switch, BrowserRouter, HashRouter } from 'react-router-dom'
import './App.css';

import Index from './pages/index'
import Home from './pages/home/index'
import Login from './pages/login/index'
import Register from './pages/register/index'
import NoMatch from './pages/not'

import Provider from './store/Provider'
import { initialState as store, reducer } from './store/store';


function App () {
  const [state, dispatch] = useReducer(reducer, store);
  return (
    <div className="App">
      <Provider store={{ state, dispatch }}>
        <HashRouter>
          <Switch>
            {/* <FrontendAuth config={routerConfig} /> */}
            <Route path="/" exact component={Index} />
            <Route path="/home" component={Home} />
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Route component={NoMatch} />
          </Switch>
        </HashRouter>
      </Provider >
    </div >
  );
}

export default App;

