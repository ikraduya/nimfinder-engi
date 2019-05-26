import React from 'react';
import { HashRouter } from 'react-router-dom';
import Layout from './commons/Layout';
import logo from './logo.svg';
import './App.css';

import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';

function App() {
  return (
    <HashRouter>
      <Layout path="/" exact component={Home}/>
      <Layout auth path="/register" component={Register}/>
      <Layout auth path="/login" component={Login}/>
    </HashRouter>
  );
}

export default App;
