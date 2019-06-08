import React from 'react';
import { HashRouter, Switch } from 'react-router-dom';
import Layout from './commons/Layout';
import './App.css';

import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import NoMatch from './components/NoMatch';

function App() {
  return (
    <HashRouter>
      <Switch>
        <Layout path="/" exact component={Home}/>
        <Layout auth path="/register" component={Register}/>
        <Layout auth path="/login" component={Login}/>
        <Layout nomatch path="/404" component={NoMatch}/>
        <Layout nomatch component={NoMatch}/>
      </Switch>
    </HashRouter>
  );
}

export default App;
