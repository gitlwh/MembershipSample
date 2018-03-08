import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import LoginForm from './LoginForm';
import { withAuth } from '@okta/okta-react';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { authenticated: null };
    this.checkAuthentication = this.checkAuthentication.bind(this);
    this.checkAuthentication();
  }

  async checkAuthentication() {
    console.log("doing checkAuthentication");
    const authenticated = await this.props.auth.isAuthenticated();
    console.log("checkAuthentication\n"+JSON.stringify(this.props.auth));
    console.log("state\n"+JSON.stringify(this.state));
    if (authenticated !== this.state.authenticated) {
      this.setState({ authenticated });
    }
  }

  componentDidUpdate() {
    this.checkAuthentication();
  }

  render() {
    if (this.state.authenticated === null) return null;
    console.log("anthenticated!!!"+JSON.stringify(this.state));
    return this.state.authenticated ?
      
      <Redirect to={{ pathname: '/profile' }} /> :
      <LoginForm baseUrl={this.props.baseUrl} />;
      
  }
};

export default withAuth(Login);