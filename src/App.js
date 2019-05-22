import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Layout from './commons/Layout';
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
      <Layout path="/" exact component={Home}/>
      <Layout path="/register" component={Register}/>
      <Layout path="/login" component={Login}/>
    </BrowserRouter>
  );
}

export default App;
