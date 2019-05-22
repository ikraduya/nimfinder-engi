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
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import { Link, Redirect} from 'react-router-dom';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: '',
    }
  }

  render() {
    const { redirect } = this.state;

    if (redirect && window.location.pathname !== redirect) {
      return <Redirect to={redirect} push />
    }

    return (
      <Navbar className="mb-4">
        <Container fluid>
          <NavbarBrand tag={Link} to="/">Aromage NIMFinder</NavbarBrand>
        </Container>
      </Navbar>
    )
  }
}

export default Header;