import React from 'react';
import { Route } from 'react-router-dom';

import Header from '../Header';
import Footer from '../Footer';

class Layout extends React.PureComponent {
  constructor(props) {
    super(props);
    this.renderHeader = this.renderHeader.bind(this);
  }

  renderHeader(auth) {
    if (!auth) {
      return (<Header />);
    }
    return (<div className="my-4"/>);
  }

  render() {
    const { component: Component, ...rest } = this.props;
    
    return (
      <Route {...rest} render={(props) => {
        return (
          <div>
            {/* <Header /> */}
            {this.renderHeader(rest.auth)}
            <Component {...props}/>
            <Footer />
          </div>
        )
      }}/>
    );
  }
}

export default Layout;