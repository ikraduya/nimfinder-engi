import React, { Component } from 'react';
import { Route } from 'react-router-dom';

class Layout extends Component {
  render() {
    const { component: Component, ...rest } = this.props;
  
    return (
      <Route {...rest} render={(props) => {
        return (
          <div>
            {/* TODO: add Footer components */}
            {/* <Header /> */}
            <Component {...props}/>
            {/* TODO: add footer components */}
            {/* <Footer /> */}
          </div>
        )
      }}/>
    );
  }
}

export default Layout;