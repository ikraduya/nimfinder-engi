import React from 'react';
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';
import { post } from 'axios';
import Swal from 'sweetalert2';
import FontAwesome from 'react-fontawesome';
import { Redirect, withRouter } from 'react-router-dom';

class Register extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      loading: false,
      password: '',
      conpassword: '',
      passwordError: '',
      passwordConfirmation: '',
      redirect: '',
    };
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleConnPasswordChange = this.handleConnPasswordChange.bind(this);
    this.onRegisterPress = this.onRegisterPress.bind(this);
  }

  handleUsernameChange(event) {
    this.setState({
      username: event.target.value
    });
  }

  handlePasswordChange(event) {
    this.setState({
      password: event.target.value
    });
  }

  handleConnPasswordChange(event) {
    this.setState({
      conpassword: event.target.value
    });
  }

  onRegisterPress() {
    const { username, password, passwordConfirmation } = this.state;
    if (password !== passwordConfirmation) {
      this.setState({
        passwordError: "Password confirmation doesn't match",
      })
    } else {
      post('https://api.stya.net/nim/register', {
        username,
        password,
      })
        .then(({ data }) => {
          if (data.status === "OK") {
            this.setState({
              email: '',
              firstname: '',
              lastname: '',
              password: '',
              passwordConfirmation: '',
            }, () => {
              Swal({
                title: 'Success',
                type: 'success',
                text: 'Register success, please login',
                timer: '1500',
                animation: true,
              }, () => {
                this.setState({
                  loading: false,
                  redirect: '/login',
                });
              })
            });
          } else {
            Swal({
              title: 'Failed',
              type: 'info',
              text: data.message,
              timer: '1500',
              animation: true
            });
            this.setState({
              username: '',
              password: '',
              passwordConfirmation: '',
            });
          }
        })
        .catch(() => {
          Swal({
            title: 'Error',
            type: 'error',
            text: 'Failed to contact the server',
            timer: '1500',
            animation: true
          });
        });
    }
  }

  renderButtonText() {
    if (this.state.loading) {
      return (
        <FontAwesome
          name='spinner'
          size='2x'
          spin
        />
      );
    }

    return 'Register';
  }

  render() {
    const { username, password, passwordConfirmation, passwordError, loading, redirect } = this.state;
    if (redirect) {
      return (
        <Redirect
          to={{pathname: redirect}}
          push
        />
      )
    }

    return (
      <Container>
        <Row>
          <Col sm="12">
            <h1>Register to Engi's NIMFinder</h1>
          </Col>
        </Row>
        <Row>
          <Col sm="12">
            <Form>
              <FormGroup>
                <Input 
                  type="text"
                  onChange={this.handleUsernameChange}
                  value={username || ''}
                  name="username"
                  id="register-username"
                  placeholder=" "
                />
                <Label for="register-username">Username</Label>
              </FormGroup>

              <FormGroup>
                <Input 
                  type="password"
                  name="password"
                  id="register-password"
                  onChange={this.handlePasswordChange}
                  placeholder=" "
                  value={password || ''}
                />
                <Label for="register-password">Password</Label>
              </FormGroup>

              <FormGroup>
                <Input
                  type="password"
                  name="conpassword"
                  id="register-conpassword"
                  onChange={this.handleConPasswordChange}
                  placeholder=" "
                  value={passwordConfirmation || ''}
                />
                <Label for="register-conpassword">Password Confirmation</Label>
              </FormGroup>

              <Button
                color="primary"
                className="btn-red"
                block
                onClick={this.onRegisterPress}
                type="submit"
                disabled={passwordError.length > 0 || loading || username.length < 1 || password.length < 1 || username.length > 20}
              >
                {this.renderButtonText()}
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default withRouter(Register);