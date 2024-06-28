import {GoogleLogin} from 'react-google-login';
const clientId = "1095047001559-uqfv7sj3nbph166el14200q2u6rhm38i.apps.googleusercontent.com"

function Login() {

    const onSuccess = (res) => {
        console.log("Login Success. User: ", res.profileObj);
    }
    const onFailure = (res) => {
        console.log("Login Failure. User: ", res);
    }

    return (
    <div id="signInButton">
        <GoogleLogin
        clientId={clientId}
        buttonText="Login"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={'single_host_origin'}
        isSignedIn={true}
        />
    </div>
    )
}
export default Login