import React from 'react';
import { 
  Collapse,
  Container,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import { Link, Redirect} from 'react-router-dom';
import Cookies from 'universal-cookie';

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.handleLogout = this.handleLogout.bind(this);

    this.state = {
      redirect: '',
      isOpen: false,
    }
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  handleLogout() {
    const cookies = new Cookies();
    cookies.remove('token');
    this.setState({
      redirect: '/login'
    })
  }

  render() {
    const { redirect } = this.state;

    if (redirect && window.location.pathname !== redirect) {
      return <Redirect to={redirect} push />
    }

    return (
      <Navbar className="mb-4" color="primary" dark expand="md">
        <Container fluid>
          <NavbarBrand tag={Link} to="/">Aromage NIMFinder</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink style={{color: 'white'}} onClick={this.handleLogout} href="#">Logout</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    )
  }
}

export default Header;