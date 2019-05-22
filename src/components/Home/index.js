import React from 'react';
import axios from 'axios';
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Table,
  Input,
  InputGroup,
  InputGroupButtonDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  Button,
  CardFooter,
  Pagination,
  PaginationItem,
  PaginationLink,
} from 'reactstrap';
import Cookies from 'universal-cookie';

class Home extends React.PureComponent {
  constructor(props) {
    super(props);

    this.toggleDropDownSearchBy = this.toggleDropDownSearchBy.bind(this);
    this.toggleDropDownResultPerPage = this.toggleDropDownResultPerPage.bind(this);
    this.selectSearchByParam = this.selectSearchByParam.bind(this);
    this.selectResultPerPageParam = this.selectResultPerPageParam.bind(this);

    this.state = {
      dropDownSearchByText: 'Search By',
      dropDownSearchByOpen: false,
      dropDownResultPerPageText: 'Result Per Page',
      dropDownResultPerPageOpen: false,
      studentList: [],
      
      // Fetchdata params
      page: 0,
      searchBy: 'NIM',
      maxItem: 10,

      // pagination
      prevBtnEnable: false,
      nextBtnEnable: false,
    }
  }

  componentDidMount() {
    // const cookies = new Cookies();
    // cookies.set('myCat', 'Pacman', {path: '/'})
    // console.log(cookies.get('myCat')); // Pacman
  }

  toggleDropDownSearchBy() {
    this.setState({
      dropDownSearchByOpen: !this.state.dropDownSearchByOpen,
    });
  }

  toggleDropDownResultPerPage() {
    this.setState({
      dropDownResultPerPageOpen: !this.state.dropDownResultPerPageOpen,
    });
  }

  selectSearchByParam({ target }) {
    this.setState({
      dropDownSearchByText: 'Search By: ' + target.value,
      searchBy: target.value,
    });
  }

  selectResultPerPageParam({ target }) {
    this.setState({
      dropDownResultPerPageText: 'Result Per Page: ' + target.value,
      maxItem: target.value,
    });
  }

  fetchStudentData() {
    const { searchBy, maxItem } = this.state;

    // axios.get()
  }

  renderPagination() {
    const { page } = this.state;

    return (
      <Pagination>
        <PaginationItem className="text-center"  style={{marginRight: "auto", width: "90px"}}>
          <PaginationLink href="#" >Previous</PaginationLink>
        </PaginationItem>
        <PaginationItem className="text-center" style={{marginLeft: "auto", width: "90px"}}>
          <PaginationLink href="#" >Next</PaginationLink>
        </PaginationItem>
      </Pagination>
    );
  }
  
  render() {
    const { dropDownSearchByOpen, dropDownSearchByText, dropDownResultPerPageOpen, dropDownResultPerPageText } = this.state;

    return (
      <div>
        <Container>
          <Row>
            <Col xs="12" sm="12" md="12">
              <Card className="home-card">
                <CardHeader>
                  <InputGroup>
                    <Input placeholder="Search..." />
                    
                    <InputGroupButtonDropdown addonType="append" isOpen={dropDownSearchByOpen} toggle={this.toggleDropDownSearchBy}>
                      <DropdownToggle color="success" caret>
                        {dropDownSearchByText}
                      </DropdownToggle>
                      <DropdownMenu  onClick={this.selectSearchByParam}>
                        <DropdownItem value="NIM">NIM</DropdownItem>
                        <DropdownItem value="Nama">Nama</DropdownItem>
                      </DropdownMenu>
                    </InputGroupButtonDropdown>

                    <InputGroupButtonDropdown addonType="append" isOpen={dropDownResultPerPageOpen} toggle={this.toggleDropDownResultPerPage}>
                      <DropdownToggle color="primary" caret>
                        {dropDownResultPerPageText}
                      </DropdownToggle>
                      <DropdownMenu onClick={this.selectResultPerPageParam}>
                        <DropdownItem value="10">10</DropdownItem>
                        <DropdownItem value="25">25</DropdownItem>
                        <DropdownItem value="50">50</DropdownItem>
                        <DropdownItem value="100">100</DropdownItem>
                      </DropdownMenu>
                    </InputGroupButtonDropdown>

                    <Button className="ml-2" color="primary">Search</Button>
                  </InputGroup>
                </CardHeader>

                <CardBody className="card-table">
                  <Table responsive>
                    <thead>
                      <tr>
                        <th>Nama</th>
                        <th>NIM TPB</th>
                        <th>NIM Jurusan</th>
                        <th>Prodi</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">Ikraduya Edian</th>
                        <th>16517187</th>
                        <th>13517106</th>
                        <th>Teknik Informatika</th>
                      </tr>
                      <tr>
                        <th scope="row">Ikraduya Edian 2</th>
                        <th>16517000</th>
                        <th>13517000</th>
                        <th>Teknik Informatika</th>
                      </tr>
                    </tbody>
                  </Table>
                </CardBody>
              
                <CardFooter>{this.renderPagination()}</CardFooter>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Home;