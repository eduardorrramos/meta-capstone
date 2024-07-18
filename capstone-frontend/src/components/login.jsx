import { GoogleLogin } from "react-google-login";
const clientId =
  "1095047001559-uqfv7sj3nbph166el14200q2u6rhm38i.apps.googleusercontent.com";
import { useNavigate } from "react-router-dom";
import ApplicationContext from "../applicationContext";

function Login() {
  const navigate = useNavigate();
  const onSuccess = (res) => {
    console.log("Login Success. User: ", res.profileObj);
    console.log(res)
    const individual = res.profileObj;
    sessionStorage.setItem('name', res.profileObj.name)
    sessionStorage.setItem('email', res.profileObj.email)
    console.log(sessionStorage.getItem('name'))
    console.log(sessionStorage.getItem('email'))
    // comments, hard coded email
// on log out, clear local storage
// secure api using tokens, google this, would make api calls more strong, only authenticated folks can access the data from the api

//eduardo is logged in but can not access to kena, using token and checking this token

    //make user cookie, check if in database if not then add cookie
    // within on success, set the name and email id for the context
    const userData = {
      email: individual.email,
      googleId: individual.googleId,
      name: individual.name,
      imgUrl: individual.imageUrl,
    };
    // instead of passing props thru url in app.jsx, use cookie when log users int
    fetch("http://localhost:5000/users")
      .then((response) => response.json())
      .then((data) => {
        let boolean = false;
        for (const item in data) {
          if (data[item].email == userData.email) {
            boolean = true;
          }
        }
        if (!boolean) {
          fetch("http://localhost:5000/users", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "http://localhost:5000/users",
            },
            body: JSON.stringify(userData),
          })
            .then((response) => response.json())
            .then((data) => console.log(data))
            .catch((error) => console.error(error));
        } else {
          navigate(`/home`);
        }
      });
    navigate(`/home`);
  };
  //functions that allow me to modify the context variables
  //action function, update 
//show log in page, or hoome page after checking if already logged in or not
// get information from google log in if user information
// think of context like state, resets afgter every render so email is null if the page is refreshed
// console.log(res.isSignedIn())

  const onFailure = (res) => {
    console.log("Login Failure. User: ", res);
  };
  return (
    <div id="signInButton">
      <GoogleLogin
        clientId={clientId}
        buttonText="Login"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={"single_host_origin"}
        isSignedIn={true}
      />
    </div>
  );
}
export default Login;
