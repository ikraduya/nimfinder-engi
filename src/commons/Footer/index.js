import React from 'react';
import { Container, Row, Col } from 'reactstrap';

class Footer extends React.Component {
  render() {
    return (
      <Container>
        <Row>
          <Col>
            <div className='text-center mt-3'>
              <p>Copyright &copy;2019 Ikraduya Edian - Jambi, Indonesia.</p>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Footer;