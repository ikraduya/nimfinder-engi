import React from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import { withRouter, Link } from 'react-router-dom';

class NoMatch extends React.PureComponent {
  render() {
    return (
      <Container>
        <Row>
          <Col sm="12" className="text-center">
            <h1>404 Not Found :(</h1>
            <p>The page that you are looking for is not here, sorry</p>
            <Link to="/"><Button color="primary">Home</Button></Link>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default withRouter(NoMatch);