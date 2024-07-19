import { GoogleLogin } from "react-google-login";
const clientId =
  "1095047001559-uqfv7sj3nbph166el14200q2u6rhm38i.apps.googleusercontent.com";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const onSuccess = (res) => {
    console.log("Login Success. User: ", res.profileObj);

    const individual = res.profileObj;
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
          navigate(`/home/${res.profileObj.email}`);
        }
      });
    navigate(`/home/${res.profileObj.email}`);
  };

  const onFailure = (res) => {
    console.log("Login Failure. User: ", res);
  };
  //google sends you token
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
