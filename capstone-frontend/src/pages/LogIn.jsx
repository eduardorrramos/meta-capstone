import Login from "../components/login";
import Logout from "../components/logout";
import { useEffect } from "react";
const clientId =
  "1095047001559-uqfv7sj3nbph166el14200q2u6rhm38i.apps.googleusercontent.com";
import { gapi } from "gapi-script";

function LogIn() {
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientId,
        scope: "",
      });
    }
    gapi.load("client:auth2", start);
  });

  return (
    <div>
      <Login />
      <Logout />
    </div>
  );
}
export default LogIn;
