export const logout = () => ({
    type: 'LOGOUT'
});

export const loginError = (error) => ({
    type: 'LOGIN_ERROR',
    payload: error
});

export const loginSuccess = (data) => ({
    type: 'LOGIN_SUCCESS',
    payload: data
});

export const loginApiCall = (oktaAuth, username, password) => {
    console.log("loginApicall called");
    return dispatch => {
        return oktaAuth.signIn({
            username: username,
            password: password
        }).then(res => {
            console.log("suc"+JSON.stringify(res));
            dispatch(loginSuccess(res.sessionToken));
        }).catch(err => {
            console.log("err"+err.message + '\n error', err);
            dispatch(loginError(err.message));
        });



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
    };
};