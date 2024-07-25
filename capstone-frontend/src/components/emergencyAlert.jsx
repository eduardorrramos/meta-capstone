import { useEffect, useContext } from "react";
import ApplicationContext from "../applicationContext";
import { Button } from "@mui/material";

function EmergencyAlert(props) {
  const { socket, userName } = useContext(ApplicationContext);
  const { currentBorder } = props;
  let userLocation;

  navigator.geolocation.getCurrentPosition((position) => {
    userLocation = position.coords.latitude;
  });

  const sendAlert = () => {
    const websocket = socket.current;
    websocket.send(
      `Front-End Emergency Alert 1!: user ${userName} at ${currentBorder} coords ${userLocation}`
    );
  };

  return (
    <Button variant="contained" onClick={sendAlert}>
      Emergency Alert
    </Button>
  );
}
export default EmergencyAlert;
