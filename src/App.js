import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

import Loadable from 'react-loadable';

const componentList = {
  'Home': import('./components/Home'),
  'Register': import('./components/Register'),
  'Login': import('./components/Login'),
};

const setUpLoadable = (component) => Loadable({
  loader: () => componentList[component],
  loading: () => {
    return <div>Loading...</div>
  }
})

const Home = setUpLoadable('Home');
const Register = setUpLoadable('Register');
const Login = setUpLoadable('Login');

function App() {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Home}/>
      <Route path="/register" component={Register}/>
      <Route path="/login" component={Login}/>
    </BrowserRouter>
  );
}

export default App;
