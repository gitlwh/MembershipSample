import React from 'react';
import OktaAuth from '@okta/okta-auth-js';
import { withAuth } from '@okta/okta-react';
import { connect } from 'react-redux';

import { loginApiCall } from '../../actions/Login';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      username: '',
      password: ''
    }

    this.oktaAuth = new OktaAuth({ url: props.baseUrl });

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.loginApiCall(this.oktaAuth, this.state.username, this.state.password);
    /*this.oktaAuth.signIn({
      username: this.state.username,
      password: this.state.password
    })
      .then(res => this.setState({
        sessionToken: res.sessionToken
      }))
      .catch(err => {
        this.setState({error: err.message});
        console.log(err.statusCode + ' error', err)
      });*/
  }

  handleUsernameChange(e) {
    this.setState({ username: e.target.value });
  }

  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  render() {
    console.log("in render"+this.props.sessionToken)
    if (this.props.sessionToken) {
      this.props.auth.redirect({ sessionToken: this.props.sessionToken });
      return null;
    }

    const errorMessage = this.state.error ? 
	<span className="error-message">{this.state.error}</span> : 
	null;

    return (
      <form onSubmit={this.handleSubmit}>
        {errorMessage}
        <div className="form-element">
          <label>Username:</label>
          <input
            id="username" type="text"
            value={this.state.username}
            onChange={this.handleUsernameChange} />
        </div>

        <div className="form-element">
          <label>Password:</label>
          <input
            id="password" type="password"
            value={this.state.password}
            onChange={this.handlePasswordChange} />
        </div>
        <input id="submit" type="submit" value="Submit" />
      </form>
    );
  }
};


const mapStateToProps = (state) => {
    //console.log("triger!"+JSON.stringify(state)+"this is "+state.login.sessionToken);
    return {
        sessionToken: state.login.sessionToken,
        error: state.login.error
    }
};

const mapDispatchToProps = dispatch => {
    return {
        loginApiCall: (oktaAuth, username, password) => dispatch(loginApiCall(oktaAuth, username, password))
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withAuth(LoginForm));

// export default withAuth(LoginForm);




