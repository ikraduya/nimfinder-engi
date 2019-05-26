import React from 'react';
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  FormFeedback,
  Button,
  CardTitle,
  CardBody,
} from 'reactstrap';
import axios from 'axios';
import Swal from 'sweetalert2';
import FontAwesome from 'react-fontawesome';
import { Redirect, withRouter, Link } from 'react-router-dom';
import querystring from 'querystring';
import Cookies from 'universal-cookie';

class Login extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      loading: false,
      usernameError: '',
      passwordError: '',
      error: '',
      redirect: '',
    };
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.renderButtonText = this.renderButtonText.bind(this);
    this.onLoginPress = this.onLoginPress.bind(this);
  }

  componentDidMount() {
    const cookies = new Cookies();
    const cookiesToken = cookies.get('token');
    if (cookiesToken && cookiesToken.length > 0) {  // token is available
      Swal.fire({
        title: 'You have already Log In',
        type: 'info',
        text: 'Redirecting...',
        timer: '2000',
        animation: true
      }).then(() => {
        this.setState({
          redirect: '/',
        })
      })
    }
  }

  onLoginPress() {
    const { username, password } = this.state;
    this.setState(prevState => ({
      ...prevState,
      loading: true,
    }));
    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }
    axios.post('https://api.stya.net/nim/login', querystring.stringify({
      username,
      password,
    }), config)
      .then(({ data }) => {
        if (data.status === "OK") {
          Swal.fire({
            title: 'Success',
            type: 'success',
            text: 'Log In success!',
            timer: '1500',
            animation: true,
          }).then(() => {
            const cookies = new Cookies();
            cookies.set('token', data.token, {
              maxAge: 60 * 60 * 24, 
              domain: "https://api.stya.net/nim",
            });
            this.setState({
              loading: false,
              redirect: '/',
            });
          });
        } else {
          Swal.fire({
            title:  'Failed',
            type: 'info',
            text: data.status,
            timer: '2000',
            animation: true
          });
          this.setState({
            loading: false,
            password: '',
          });
        }
      })
      .catch(() => {
        Swal.fire({
          title:  'Error',
          type: 'info',
          text: 'Login failed',
          timer: '2000',
          animation: true
        });
        this.setState({
          loading: false,
          password: '',
        });
      });
  }

  handleUsernameChange({ target }) {
    let usernameError = "";
    
    if (target.value && target.value.length > 20) {
      usernameError = "Username melebihi batas 20 karakter";
    }
    this.setState({
      username: target.value,
      usernameError,
    });
  }

  handlePasswordChange({ target }) {
    this.setState({
      password: target.value,
      error: '',
    })
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

    return 'Login';
  }

  renderError() {
    const { error } = this.state;
    if (error !== "") {
      return (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      );
    }
    return null;
  }
  
  render() {
    const { username, password, loading, usernameError, passwordError, redirect } = this.state;
    if (redirect) {
      return (
        <Redirect
          to={{pathname: redirect}}
          push
        />
      );
    }
    return (
      <div style={{ 
        flex: "1 1 auto",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "1rem 0",}}
      >  
        <Container>
          <Row>
            <Col style={{maxWidth: "24rem"}} className="mx-auto">
              <div className="text-center mb-4">
                <h3>Aromage NIMFinder</h3>
              </div>
              <Form className="card" onSubmit={(e) => e.preventDefault()}>
                <CardBody className="p-4">
                  <CardTitle style={{fontSize: "1.125rem"}}>Login to your account</CardTitle>
                  <FormGroup>
                    <Label for="login-username">Username</Label>
                    <Input
                      type="text"
                      onChange={this.handleUsernameChange}
                      value={username || ''}
                      name="username"
                      id="login-username"
                      placeholder=" "
                      invalid={(usernameError.length > 0)}
                    />
                    <FormFeedback style={{ display: (usernameError.length > 0 && username !== '') ? 'block' : 'none' }}>{usernameError}</FormFeedback>
                  </FormGroup>

                  <FormGroup>
                    <Label for="login-password">Password</Label>
                    <Input
                      type="password"
                      name="password"
                      id="login-password"
                      onChange={this.handlePasswordChange}
                      placeholder=" "
                      value={password || ''}
                    />
                    <FormFeedback style={{ display: (passwordError.length > 0 && password !== '') ? 'block' : 'none' }}>{passwordError}</FormFeedback>
                  </FormGroup>

                  <div style={{marginTop: "1.5rem"}}>
                    <Button
                      color="primary"
                      block
                      onClick={this.onLoginPress}
                      type="submit"
                      disabled={passwordError.length > 0 || loading || username.length < 1 || password.length < 1 || username.length > 20}
                    >
                      {this.renderButtonText()}
                    </Button>
                  </div>
                </CardBody>
              </Form>
              <div className="text-center mt-2">
                <Link to="/register">Don&apos;t have account? Sign Up</Link>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

export default withRouter(Login);