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
  FormFeedback,
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
      redirect: '',
      usernameError: '',
    };
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleConPasswordChange = this.handleConPasswordChange.bind(this);
    this.onRegisterPress = this.onRegisterPress.bind(this);
  }

  handleUsernameChange({target}) {
    let usernameError = "";
    if (target.value && target.value.length > 20) {
      usernameError = "Username melebihi batas 20 karakter"
    }
    this.setState({
      username: target.value,
      usernameError
    });
  }

  handlePasswordChange({target}) {
    const { conpassword } = this.state;

    let passwordError = "";
    if (conpassword.length === target.value.length && conpassword !== target.value) {
      passwordError = "Confirmation password doesn't match";
    }
    this.setState({
      password: target.value,
      passwordError,
    });
  }

  handleConPasswordChange({target}) {
    const { password } = this.state;

    let passwordError = "";
    if (password.length === target.value.length && password !== target.value) {
      passwordError = "Confirmation password doesn't match";
    }
    this.setState({
      conpassword: target.value,
      passwordError,
    });
  }

  // username: kira
  // pass: passkira

  onRegisterPress() {
    const { username, password, conpassword } = this.state;
    if (password !== conpassword) {
      this.setState({
        passwordError: "Password confirmation doesn't match",
      })
    } else {
      Swal.fire({
        title: 'Success',
        type: 'success',
        text: 'Register success, please login',
        timer: '1500',
        animation: true,
      }).then(() => {
        console.log("hey");
        this.setState({
          loading: false,
          redirect: '/login',
        });
      })
      console.log("masuk");
      console.log(username + " " + password);
      // post('https://api.stya.net/nim/register', {
      //   username,
      //   password,
      // })
      //   .then(({ data }) => {
      //     if (data.status === "OK") {
      //       this.setState({
      //         email: '',
      //         firstname: '',
      //         lastname: '',
      //         password: '',
      //         passwordConfirmation: '',
      //       }, () => {
      //         Swal({
      //           title: 'Success',
      //           type: 'success',
      //           text: 'Register success, please login',
      //           timer: '1500',
      //           animation: true,
      //         }, () => {
      //           this.setState({
      //             loading: false,
      //             redirect: '/login',
      //           });
      //         })
      //       });
      //     } else {
      //       Swal({
      //         title: 'Failed',
      //         type: 'info',
      //         text: data.message,
      //         timer: '1500',
      //         animation: true
      //       });
      //       this.setState({
      //         username: '',
      //         password: '',
      //         passwordConfirmation: '',
      //       });
      //     }
      //   })
      //   .catch(() => {
      //     Swal({
      //       title: 'Error',
      //       type: 'error',
      //       text: 'Failed to contact the server',
      //       timer: '1500',
      //       animation: true
      //     });
      //   });
    }

    return false;
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
    const { username, password, conpassword, usernameError, passwordError, loading, redirect } = this.state;
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
        <Row className="mb-2">
          <Col sm="12">
            <h1>Register to Aromage NIMFinder</h1>
          </Col>
        </Row>
        <Row>
          <Col sm="12">
            <Form onSubmit={(e) => e.preventDefault()}>
              <FormGroup>
                <Label for="register-username">Username</Label>
                <Input 
                  type="text"
                  onChange={this.handleUsernameChange}
                  value={username || ''}
                  name="username"
                  id="register-username"
                  placeholder=" "
                  invalid={(usernameError.length > 0)}
                />
                <FormFeedback style={{ display: (usernameError.length > 0 && username !== '') ? 'block' : 'none' }}>{usernameError}</FormFeedback>
              </FormGroup>

              <FormGroup>
                <Label for="register-password">Password</Label>
                <Input 
                  type="password"
                  name="password"
                  id="register-password"
                  onChange={this.handlePasswordChange}
                  placeholder=" "
                  value={password || ''}
                />
              </FormGroup>

              <FormGroup>
                <Label for="register-conpassword">Password Confirmation</Label>
                <Input
                  type="password"
                  name="conpassword"
                  id="register-conpassword"
                  onChange={this.handleConPasswordChange}
                  placeholder=" "
                  value={conpassword || ''}
                  invalid={(passwordError.length > 0)}
                  valid={(passwordError.length === 0 && password === conpassword && password.length > 0)}
                />
                <FormFeedback style={{ display: (passwordError.length > 0 && password !== '') ? 'block' : 'none' }}>{passwordError}</FormFeedback>
              </FormGroup>

              <Button
                color="primary"
                className="btn-red"
                block
                onClick={this.onRegisterPress}
                type="submit"
                disabled={passwordError.length > 0 || loading || username.length < 1 || password.length < 1 || password.length !== conpassword.length || username.length > 20}
              >
                {this.renderButtonText()}
              </Button>

              <div className="text-center mt-2">
                <a href="/login">Already have an account account? Sign In</a>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default withRouter(Register);