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
    this.setState({
      username: target.value,
      error: '',
    })
  }

  handlePasswordChange({ target }) {
    this.setState({
      username: target.value,
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
    const { username, password, loading, passwordError, redirect } = this.state;
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
          <Row>
            <Col sm="12">
              <h1>Log In to Engi's NIMFinder</h1>
            </Col>
          </Row>
					<Row>
						<Col>
              { this.renderError() }
							<form>
                <FormGroup>
                  <Input
                    type="text"
                    onChange={this.handleUsernameChange}
                    value={username || ''}
                    name="username"
                    id="login-username"
                    placeholder=" "
                  />
                  <Label for="login-username">Username</Label>
                </FormGroup>

                <FormGroup>
                  <Input
                    type="password"
                    name="password"
                    id="login-password"
                    onChange={this.handlePasswordChange}
                    placeholder=" "
                    value={password || ''}
                  />
                  <Label for="login-password">Password</Label>
                  <FormFeedback style={{ display: (passwordError.length > 0 && password !== '') ? 'block' : 'none' }}>{passwordError}</FormFeedback>
                </FormGroup>

                <Button
                  color="primary"
                  className='btn-red'
                  block
                  onClick={this.onLoginPress}
                  type="submit"
                  disabled={passwordError.length > 0 || loading || username.length < 1 || password.length < 1 || username.length > 20}
                >
                  {this.renderButtonText()}
                </Button>
              </form>
						</Col>
					</Row>
				</Container>
    )
  }
}

export default withRouter(Login);