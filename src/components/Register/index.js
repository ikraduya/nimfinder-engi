import React from 'react';
import {
  Container,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormFeedback,
  CardBody,
  CardTitle,
} from 'reactstrap';
import { post } from 'axios';
import Swal from 'sweetalert2';
import FontAwesome from 'react-fontawesome';
import querystring from 'querystring';
import { Redirect, withRouter, Link } from 'react-router-dom';
import Cookies from 'universal-cookie';


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
    this.renderButtonText = this.renderButtonText.bind(this);
    this.onRegisterPress = this.onRegisterPress.bind(this);
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
    if ((conpassword.length > target.value.length) || (conpassword.length === target.value.length && conpassword !== target.value)) {
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
    if ((target.value.length > password.length) || (password.length === target.value.length && password !== target.value)) {
      passwordError = "Confirmation password doesn't match";
    }
    this.setState({
      conpassword: target.value,
      passwordError,
    });
  }

  // username: kira2
  // pass: passkira

  // username: ikra
  // pass: passwordikra

  onRegisterPress() {
    const { username, password, conpassword } = this.state;
    if (password !== conpassword) {
      this.setState({
        passwordError: "Password confirmation doesn't match",
      })
    } else {
      this.setState(prevState => ({
        ...prevState,
        loading: true,
      }));
      const config = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      };
      post('https://api.stya.net/nim/register', querystring.stringify({
        username,
        password,
      }), config)
        .then(({ data }) => {
          if (data.status === "OK") {
            this.setState({
              email: '',
              username: '',
              password: '',
              conpassword: '',
            }, () => {
              Swal.fire({
                title: 'Success',
                type: 'success',
                text: 'Register success, please login',
                timer: '1500',
                animation: true,
              }).then(() => {
                this.setState({
                  loading: false,
                  redirect: '/login',
                });
              })
            });
          } else {
            Swal.fire({
              title: 'Failed',
              type: 'info',
              text: data.status,
              timer: '2000',
              animation: true
            });
            this.setState({
              username: '',
              password: '',
              conpassword: '',
              loading: false,
            });
          }
        })
        .catch(() => {
          Swal.fire({
            title: 'Error',
            type: 'error',
            text: 'Failed to contact the server',
            timer: '1500',
            animation: true
          });
          this.setState({
            loading: false,
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
      <div style={{ 
        flex: "1 1 auto",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "1rem 0",}}
      >  
        <Container>
          <Col style={{maxWidth: "24rem"}} className="mx-auto">
            <div className="text-center mb-4">
              <h3>Aromage NIMFinder</h3>
            </div>
            <Form className="card" onSubmit={(e) => e.preventDefault()}>
              <CardBody className="p-4">
                <CardTitle style={{fontSize: "1.125rem"}}>Create new account</CardTitle>

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
                <div style={{marginTop: "1.5rem"}}>
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
                </div>
                
              </CardBody>
            </Form>
            <div className="text-center mt-2">
              <Link to="/login">Already have an account account? Sign In</Link>
            </div>
          </Col>
        </Container>
      </div>
    );
  }
}

export default withRouter(Register);