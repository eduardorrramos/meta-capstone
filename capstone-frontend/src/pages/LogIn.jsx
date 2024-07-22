import Login from "../components/login";
import Logout from "../components/logout";
import { useEffect } from "react";
   
import { gapi } from "gapi-script";

function LogIn() {
  const clientId = import.meta.env.CLIENT_ID;
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientId,
        scope: "",
      });
    }
    console.log("client" + clientId)
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
