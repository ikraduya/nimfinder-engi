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
import Swal from 'sweetalert2';
import { Redirect, withRouter } from 'react-router-dom';
import Cookies from 'universal-cookie';

class Home extends React.PureComponent {
  constructor(props) {
    super(props);

    this.toggleDropDownSearchBy = this.toggleDropDownSearchBy.bind(this);
    this.toggleDropDownResultPerPage = this.toggleDropDownResultPerPage.bind(this);
    this.selectSearchByParam = this.selectSearchByParam.bind(this);
    this.selectResultPerPageParam = this.selectResultPerPageParam.bind(this);
    this.handleSearchTextChange = this.handleSearchTextChange.bind(this);
    this.fetchStudentData = this.fetchStudentData.bind(this);

    this.state = {
      dropDownSearchByText: 'Search By: NIM',
      dropDownSearchByOpen: false,
      dropDownResultPerPageText: 'Result Per Page: 10',
      dropDownResultPerPageOpen: false,
      studentList: [],
      
      // Fetchdata params
      searchText: '',
      page: 0,
      searchBy: 'id',
      maxItem: 10,
      cookiesToken: '',

      // pagination
      prevBtnEnable: false,
      nextBtnEnable: false,

      redirect: '',
    }
  }

  componentDidMount() {
    const cookies = new Cookies();
    const cookiesToken = cookies.get('token');
    if (!cookiesToken || cookiesToken === '') {  // redirect to login
      Swal.fire({
        title: 'You need to Log In first!',
        type: 'info',
        timer: '2000',
        animation: true
      }).then(() => {
        this.setState({
          redirect: '/login',
        })
      })
    } else {
      this.setState({
        cookiesToken,
      })
    }
  }

  handleSearchTextChange({ target }) {
    this.setState({
      searchText: target.value,
    });
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
      dropDownSearchByText: 'Search By: ' + target.name,
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
    const { searchText, searchBy, maxItem, page, cookiesToken } = this.state;

    let params;
    if (searchBy === "id") {
      params = {
        query: searchText,
        count: maxItem,
        page,
      }
    } else {  // by name
      params = {
        name: searchText,
        count: maxItem,
        page,
      }
    }
    axios.get('https://api.stya.net/nim/by' + searchBy, {
      params,
      headers: {
        'Access-Control-Allow-Headers':'application/json',
        // Cookie: "token=" + cookiesToken,
        // TODO: cari cara agar tidak terjadi "refused to set unsafe header"
        Cookie: document.cookie
      },
      // withCredentials:true
    })
      .then(({data}) => {
        console.log("data", data);
      })
      .catch(() => {
        Swal.fire({
          type: 'error',
          title: 'Oops...',
          text: 'Could not contact the server'
        });
      })
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
    const { redirect, searchText, dropDownSearchByOpen, dropDownSearchByText, dropDownResultPerPageOpen, dropDownResultPerPageText } = this.state;
    if (redirect) {
      return (
        <Redirect
          to={{pathname: redirect}}
          push
        />
      );
    }

    return (
      <div>
        <Container>
          <Row>
            <Col xs="12" sm="12" md="12">
              <Card className="home-card">
                <CardHeader>
                  <InputGroup>
                    <Input 
                      placeholder="Search..." 
                      onChange={this.handleSearchTextChange}
                      value={searchText || ''}
                      name="search-text"
                    />
                    
                    <InputGroupButtonDropdown addonType="append" isOpen={dropDownSearchByOpen} toggle={this.toggleDropDownSearchBy}>
                      <DropdownToggle color="success" caret>
                        {dropDownSearchByText}
                      </DropdownToggle>
                      <DropdownMenu  onClick={this.selectSearchByParam}>
                        <DropdownItem name="NIM" value="id">NIM</DropdownItem>
                        <DropdownItem name="Nama" value="name">Nama</DropdownItem>
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

                    <Button className="ml-2" color="primary" onClick={this.fetchStudentData}>Search</Button>
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
                        <td>Ikraduya Edian</td>
                        <td>16517187</td>
                        <td>13517106</td>
                        <td>Teknik Informatika</td>
                      </tr>
                      <tr>
                        <td>Ikraduya Edian 2</td>
                        <td>16517000</td>
                        <td>13517000</td>
                        <td>Teknik Informatika</td>
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

export default withRouter(Home);