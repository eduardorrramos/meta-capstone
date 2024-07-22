import { GoogleLogin } from "react-google-login";
const clientId =
  "1095047001559-uqfv7sj3nbph166el14200q2u6rhm38i.apps.googleusercontent.com";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const onSuccess = (res) => {
    console.log("Login Success. User: ", res.profileObj);
    const individual = res.profileObj;
    console.log(res.profileObj)
    sessionStorage.setItem("name", individual.name);
    sessionStorage.setItem("email", individual.email);
    sessionStorage.setItem("googleid", individual.googleId);
    sessionStorage.setItem("image", individual.imageUrl);
    console.log(individual.imageUrl)

    const userData = {
      email: individual.email,
      googleId: individual.googleId,
      name: individual.name,
      imgUrl: individual.imageUrl,
    };

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
