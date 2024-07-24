import ModalPopulate from "../components/modal";
import ApplicationContext from "../applicationContext";
import { useContext, useState, useEffect } from "react";
import AccountMenu from "../components/newHeader";
import { Button } from "@mui/material";
import { Grid } from "@mui/material";

function EmergencyContact() {
  const { socket, userName } = useContext(ApplicationContext);
  let userLocation = ''
  const sendAlert = () => {
    const websocket = socket.current;
    websocket.send(`Front-End Emergency Alert: User 1${userName}`);
  };

  navigator.geolocation.getCurrentPosition((position) => {
    userLocation = position.coords.latitude;
  });

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={12}>
        <AccountMenu variable={userName} />
      </Grid>
      <Grid item xs={12} md={12}>
      

        <section class="geolocation-section">
          <h2>Geolocation</h2>
          <p>
            Your current location is:{" "}
            <span id="geolocation">{userLocation.latitude}</span>
          </p>
        </section>
      </Grid>

      <Grid item xs={12} md={12}>
        <Button variant="contained" onClick={sendAlert}>
          Emergency Alert
        </Button>
      </Grid>
      <ModalPopulate />
    </Grid>
  );
}
export default EmergencyContact;
