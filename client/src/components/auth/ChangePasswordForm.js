import React from 'react'; 
import OktaAuth from '@okta/okta-auth-js';
import { withAuth } from '@okta/okta-react';
import { connect } from 'react-redux';

import { changePasswordApiCall } from '../../actions/ChangePassword';

import config from '../../app.config';

class ChangePasswordForm extends React.Component{
    constructor(props){
        super(props);
        this.state = { user: null, oldPassword: '', newPassword: '' };
        this.getCurrentUser = this.getCurrentUser.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleOldPasswordChange = this.handleOldPasswordChange.bind(this);
        this.handleNewPasswordChange = this.handleNewPasswordChange.bind(this);
    }

    async getCurrentUser(){
        this.props.auth.getUser()
            .then(user => this.setState({user}));
    }

    handleOldPasswordChange(e) {
        this.setState({ oldPassword: e.target.value });
    }
    handleNewPasswordChange(e) {
        this.setState({ newPassword: e.target.value });
    }

    handleSubmit(e){
        e.preventDefault();
        var data = {
            userId: this.state.user.sub, oldPassword: this.state.oldPassword, newPassword: this.state.newPassword
        };
        this.props.changePasswordApiCall(data);
        /*
        e.preventDefault();
        fetch('/api/users/change_password', { 
          method: 'POST', 
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data)
        }).then(json => {
          document.getElementById("message").innerHTML = json;
        })
        .catch(err => {
          this.setState({error: err.message});
          console.log(err.statusCode + ' error', err)
        });*/

        /*if (!data.oldPassword || !data.newPassword){
            dispatch(changePasswordError('New and Old, both password fields are required'));
            setTimeout(() => {
                dispatch(changePasswordError(null));
            }, 3000)
            return;
        } else if (data.oldPassword.length < 8){
            dispatch(changePasswordError('Old password length must be minimum 8 characters'));
            setTimeout(() => {
                dispatch(changePasswordError(null));
            }, 3000)
            return;
        } else if (data.newPassword.length < 8){
            dispatch(changePasswordError('New password length must be minimum 8 characters'));
            setTimeout(() => {
                dispatch(changePasswordError(null));
            }, 3000)
            return;
        }*/

        /*
        return axios({
            method: 'post',
            url: '/api/users/change_password',
            data: data,
            config: {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            }
        }).then(json => {
            dispatch(changePasswordSuccess("Password Changed"));
            setTimeout(() => {
                dispatch(changePasswordSuccess(null));
            }, 3000)
        }).catch(err => {
            dispatch(changePasswordError(err.message));
            setTimeout(() => {
                dispatch(changePasswordError(null));
            }, 3000)
        });*/



        //this.props.changePasswordApiCall(data);
    }

    componentDidMount(){
        this.getCurrentUser();
    }

    render() {
        if(!this.state.user) return null;
        return (
            <div>
                <section className="user-profile">
                    <h1>User Profile (Secure Page)</h1>
                    <div>
                        <label>Name:</label>
                        <span>{this.state.user.name}</span>
                    </div>
                </section>
                <br />
                <br />
                <div>Password requirements: at least 8 characters, a lowercase letter, an uppercase letter, a number, no parts of your username.
                  <br />If you can't satisfy the requirements, you can't do anything.
                </div>
                <form className="form-horizontal col-sm-6" onSubmit={this.handleSubmit}>
                <h3>Change Password</h3>
                    <br />
                    <div id = "message"></div>
                    <div className="form-group">
                        <label>Old Password:</label>
                        <input className="form-control" type="password" id="oldPassword" value={this.state.oldPassword} autoComplete="current-password"
                               onChange={this.handleOldPasswordChange} />
                    </div>
                    <div className="form-group">
                        <label>New Password:</label>
                        <input className="form-control" type="password" id="newPassword" value={this.state.newPassword} autoComplete="new-password"
                               onChange={this.handleNewPasswordChange} />
                    </div>
                    <input className="btn btn-outline-success col-2" type="submit" id="submit" value="Submit"/>
                </form>
            </div>
        )
    }

};



const mapStateToProps = (state) => {
    return {
        error: state.profile.error,
        success: state.profile.success
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        changePasswordApiCall: (data) => dispatch(changePasswordApiCall(data))
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withAuth(ChangePasswordForm));