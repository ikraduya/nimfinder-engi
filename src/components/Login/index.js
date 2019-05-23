import React from 'react';
import {
  Container,
  Row,
  Col,
  FormGroup,
  Input,
  Label,
  FormFeedback,
  Button,
} from 'reactstrap';
import axios from 'axios';
import FontAwesome from 'react-fontawesome';
import { Redirect, withRouter } from 'react-router-dom';

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

  onLoginPress() {
    const { username, password } = this.state;
    this.setState(prevState => ({
      ...prevState,
      loading: true,
    }));
    axios.post('https://api.stya.net/nim/login', {
      username,
      password,
    })
      .then(({ data }) => {
        if (data.status === "OK") {
          this.setState({
            loading: false,
            redirect: '/home',
            error: '',
          });
        } else {
          this.setState({
            loading: false,
            error: 'Login error, try again',
            password: '',
          });
        }
      })
      .catch(() => {
        this.setState({
          loading: false,
          error: 'Login error',
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
      <Container>
          <Row className="mb-2">
            <Col sm="12">
              <h1>Log In to Aromage NIMFinder</h1>
            </Col>
          </Row>
					<Row>
						<Col>
              { this.renderError() }
							<form>
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

                <Button
                  color="primary"
                  block
                  onClick={this.onLoginPress}
                  type="submit"
                  disabled={passwordError.length > 0 || loading || username.length < 1 || password.length < 1 || username.length > 20}
                >
                  {this.renderButtonText()}
                </Button>

                <div className="text-center mt-2">
                  <a href="/register">Don&apos;t have account? Sign Up</a>
                </div>
              </form>
						</Col>
					</Row>
				</Container>
    )
  }
}

export default withRouter(Login);