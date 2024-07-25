import Login from "../components/login";
import Logout from "../components/logout";
import { useEffect } from "react";
import { gapi } from "gapi-script";
import './LogIn.css'

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
      <div class="login-container">
  <div class="login-button">
  <Login />
  </div>
</div>
<div class="description-container">
  <h1>Welcome to Migra</h1>
  <p>Migra is an application that allows you to view the wait times of border crossings. With Migra, you can easily plan your trip and avoid long wait times at the border.</p>
  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/USCIS_logo_English.svg/2560px-USCIS_logo_English.svg.png" alt="Border Crossing Image" />
</div>

    </div>
  );
}
export default LogIn;
