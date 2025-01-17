import React, { Component } from 'react';
import { GoogleLogin } from 'react-google-login';
import { connect } from 'react-redux';
import { addUser } from '../actions';

const clientId = '378735924994-knhso2dtafl79msh19jbl9d3hvfuut9h.apps.googleusercontent.com';

const refreshTokenSetup = (res) => {
  let refreshTiming = (res.tokenObj.expires_in || 3600 - 5 * 60) * 1000;

  const refreshToken = async () => {
    const newAuthRes = await res.reloadAuthResponse();
    refreshTiming = (newAuthRes.expires_in || 3600 - 5 * 60) * 1000;

    console.log('newAuthRes:', newAuthRes);

    console.log('new auth token', newAuthRes.id_token);

    setTimeout(refreshToken, refreshTiming);
  };

  setTimeout(refreshToken, refreshTiming);
};

class Login extends Component {
    onSuccess = (res) => {
      console.log('[Login Success] currentUser:', res.profileObj);

      // if (this.props.fromHome) {
      //   this.props.history.push('/choosebudget');
      // }

      refreshTokenSetup(res);
      // this.props.logInUser(res.profileObj);
      this.props.addUser(res.profileObj.googleId, res.profileObj.name, this.props.history, this.props.clicked);
    };

    onFailure = (res) => {
      console.log('[Login failed] res:', res);
    };

    render() {
      return (
        <div>
          <GoogleLogin
            render={(renderProps) => (
              <div role="button" type="button" className={this.props.class} onClick={renderProps.onClick} disabled={renderProps.disabled}>{this.props.text}</div>
            )}
            clientId={clientId}
            buttonText="Login"
            onSuccess={this.onSuccess}
            onFailure={this.onFailure}
            cookiePolicy="single_host_origin"
            className="button-dark"
            id="google-login"
            isSignedIn
          />
        </div>
      );
    }
}

function mapStateToProps(reduxState) {
  return {
    // address: reduxState.address,
    user: reduxState.user,
  };
}
export default connect(mapStateToProps, { addUser })(Login);
