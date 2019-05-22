import React from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Table,
} from 'reactstrap';

class Home extends React.PureComponent {
  render() {
    return (
      <div>
        <Container>
          <Row>
            <Col sm="12" md="12">
              <h1>Engi's NIMFinder</h1>
            </Col>
          </Row>
          <Row>
            <Col xs="12" sm="12" md="12">
              <Card className="home-card">
                <CardHeader>
                  <CardTitle>NIM Table</CardTitle>
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
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Home;