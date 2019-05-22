import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Header from '../Header';
import Footer from '../Footer';

class Layout extends Component {
  render() {
    const { component: Component, ...rest } = this.props;
  
    return (
      <Route {...rest} render={(props) => {
        return (
          <div>
            <Header />
            <Component {...props}/>
            <Footer />
          </div>
        )
      }}/>
    );
  }
}

export default Layout;