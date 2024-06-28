import { GoogleLogout } from 'react-google-login';
const clientId = "1095047001559-uqfv7sj3nbph166el14200q2u6rhm38i.apps.googleusercontent.com";

function Logout() {
    const onSuccess = () => {
        console.log("Log out successful");
    };

    return (
        <div id="signOutButton">
            <GoogleLogout
            clientId={clientId}
            buttonText={"Logout"}
            onLogoutSuccess={onSuccess}
            />
        </div>
    );
}
export default Logout