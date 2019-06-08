import React from 'react';
import { Route } from 'react-router-dom';

import Header from '../Header';
import Footer from '../Footer';

class Layout extends React.PureComponent {
  constructor(props) {
    super(props);
    this.renderHeader = this.renderHeader.bind(this);
  }

  renderHeader(auth, nomatch) {
    if (auth || nomatch) {
      return (<div className="my-4"/>);
    }
    return (<Header />);
  }

  render() {
    const { component: Component, ...rest } = this.props;
    
    return (
      <Route {...rest} render={(props) => {
        return (
          <div>
            {this.renderHeader(rest.auth, rest.nomatch)}
            <Component {...props}/>
            <Footer />
          </div>
        )
      }}/>
    );
  }
}

export default Layout;