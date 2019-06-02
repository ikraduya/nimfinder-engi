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
// import * as xhr2 from 'xhr2';

class Home extends React.PureComponent {
  constructor(props) {
    super(props);

    this.toggleDropDownSearchBy = this.toggleDropDownSearchBy.bind(this);
    this.toggleDropDownResultPerPage = this.toggleDropDownResultPerPage.bind(this);
    this.selectSearchByParam = this.selectSearchByParam.bind(this);
    this.selectResultPerPageParam = this.selectResultPerPageParam.bind(this);
    this.handleSearchTextChange = this.handleSearchTextChange.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.fetchStudentData = this.fetchStudentData.bind(this);
    this.renderPagination = this.renderPagination.bind(this);
    this.renderStudentList = this.renderStudentList.bind(this);

    this.state = {
      dropDownSearchByText: 'Search By: NIM',
      dropDownSearchByOpen: false,
      dropDownResultPerPageText: 'Result Per Page: 10',
      dropDownResultPerPageOpen: false,
      studentList: [],
      
      // Fetchdata params
      searchText: '13517',
      page: 0,
      searchBy: 'id',
      maxItem: 10,
      cookiesToken: '',

      // pagination
      prevBtnEnable: false,
      nextBtnEnable: false,

      redirect: '',
      nextPageAvailable: false,
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
      }, () => {
        this.fetchStudentData();
      })
    }
  }

  handleSearchTextChange({ target }) {
    this.setState({
      searchText: target.value,
    });
  }

  handlePageChange(targetPage) {
    this.setState({
      page: targetPage,
    }, () => {
      this.fetchStudentData();
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
    if (searchBy === "id") {  // by nim
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
        'Auth-Token': cookiesToken
      },
    })
      .then(({data}) => {
        if (data && data.status === "OK") {
          this.setState({
            studentList: data.payload
          })

          if (data.payload.length > 0) {
            // check whether next page available
            params.page += 1;
            axios.get('https://api.stya.net/nim/by' + searchBy, {
              params,
              headers: {
                'Auth-Token': cookiesToken
              },
            })
              .then(({data: nextData}) => {
                if (nextData && nextData.payload && nextData.payload.length > 0) {
                  this.setState({
                    nextPageAvailable: true,
                  })
                }
              })
          } else {
            this.setState({
              nextPageAvailable: false,
            })
          }
          
        } else {
          Swal.fire({
            title: 'Oops..',
            type: 'info',
            text: 'Could not contact the server',
            timer: '2000',
            animation: true
          });
        }
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
    const { page, nextPageAvailable } = this.state;

    return (
      <Pagination>
        <PaginationItem className="text-center"  style={{marginRight: "auto", width: "90px"}} disabled={page === 0}>
          <PaginationLink href="#" onClick={() => this.handlePageChange(page-1)} >Previous</PaginationLink>
        </PaginationItem>
        <PaginationItem className="text-center" style={{marginLeft: "auto", width: "90px"}} disabled={!nextPageAvailable}>
          <PaginationLink href="#" onClick={() => this.handlePageChange(page+1)} >Next</PaginationLink>
        </PaginationItem>
      </Pagination>
    );
  }

  renderStudentList() {
    const { studentList } = this.state;
    if (studentList.length > 0) {
      return studentList.map((student, index) => (
        <tr key={index}>
          <td>{student.name}</td>
          <td>{student.nim_tpb}</td>
          <td>{student.nim_jur}</td>
          <td>{student.prodi}</td>
        </tr>
      ));
    }

    return (
      <tr>
        <td
          colSpan={4}
          className="text-center"
        >
          No Student Found
        </td>
      </tr>
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
                  <Table responsive className="mb-0">
                    <thead>
                      <tr>
                        <th>Nama</th>
                        <th>NIM TPB</th>
                        <th>NIM Jurusan</th>
                        <th>Prodi</th>
                      </tr>
                    </thead>
              
                    <tbody>
                      {this.renderStudentList()}
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