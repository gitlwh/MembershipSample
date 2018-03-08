export const changePasswordError = (error) => ({
    type: 'CHANGE_PASSWORD_ERROR',
    payload: error
});

export const changePasswordSuccess = (data) => ({
    type: 'CHANGE_PASSWORD_SUCCESS',
    payload: data
});

export const changePasswordApiCall = (data) => {
    return dispatch => {

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

        return fetch('/api/users/change_password', { 
          method: 'POST', 
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data)
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
        });
        /*.then(json => {
          document.getElementById("message").innerHTML = json;
        })
        .catch(err => {
          this.setState({error: err.message});
          console.log(err.statusCode + ' error', err)
        });*/
    };
};